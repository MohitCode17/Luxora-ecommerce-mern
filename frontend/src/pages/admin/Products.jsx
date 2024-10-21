import ProductImageUpload from "@/components/admin/image-upload";
import AdminProduct from "@/components/admin/product";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/components/config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const Products = () => {
  const [openCreateProductsDialog, setOpenCreateProductDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );

  const dispatch = useDispatch();
  const { toast } = useToast();

  // HANDLE SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    if (currentEditedId !== null) {
      const data = await dispatch(
        editProduct({ id: currentEditedId, formData })
      );

      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false);
        setFormData(initialState);
        setCurrentEditedId(null);
      }
    } else {
      const data = await dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      );

      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false);
        setImageFile(null);
        setFormData(initialState);

        toast({
          title: "Product added successfully.",
        });
      }
    }
  };

  // DISABLED BUTTON FUNCTIONALITY
  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  // FETCHING ALL PRODUCTS
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      {/* PRODUCTS LIST */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProduct
                key={productItem._id}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                product={productItem}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              buttonText={
                isLoading
                  ? "Please wait..."
                  : currentEditedId !== null
                  ? "Edit"
                  : "Add"
              }
              formData={formData}
              setFormData={setFormData}
              isBtnDisabled={isLoading || !isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Products;
