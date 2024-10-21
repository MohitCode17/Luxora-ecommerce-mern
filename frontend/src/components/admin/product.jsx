import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProduct = ({
  product,
  setFormData,
  setOpenCreateProductDialog,
  setCurrentEditedId,
}) => {
  const discount =
    product?.salePrice > 0
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <div className="relative group">
        {/* Image with zoom effect on hover */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product?.image}
            alt={product.title}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-4 min-h-[130px] flex flex-col justify-between">
          {/* Product Title */}
          <h2 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-gray-950 transition-colors duration-300">
            {product?.title}
          </h2>

          {/* Price Section */}
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-base font-semibold ${
                product?.salePrice > 0
                  ? "line-through text-gray-500"
                  : "text-gray-600"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <div className="flex items-center">
                <span className="text-lg font-bold text-green-600">
                  ${product?.salePrice}
                </span>
                <span className="text-sm font-semibold text-red-600 ml-2">
                  ({discount}% OFF)
                </span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer with Edit and Delete Buttons */}
        <CardFooter className="p-4 flex justify-between items-center gap-2">
          <Button
            onClick={() => {
              setCurrentEditedId(product?._id);
              setOpenCreateProductDialog(true);
              setFormData(product);
            }}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Edit
          </Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300">
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProduct;
