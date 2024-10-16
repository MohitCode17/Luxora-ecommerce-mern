import ProductImageUpload from "@/components/admin/image-upload";
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
import { addNewProduct, fetchAllProducts } from "@/store/admin/productSlice";
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

  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );

  console.log(productList);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // HANDLE SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    );

    if (data?.payload?.success) {
      dispatch(fetchAllProducts());
      setOpenCreateProductDialog(fasle);
      setImageFile(null);
      setFormData(initialState);

      toast({
        title: "Product added successfully.",
      });
    }
    console.log(data);
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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              buttonText={isLoading ? "Please wait..." : "Add"}
              formData={formData}
              setFormData={setFormData}
              isBtnDisabled={isLoading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Products;
