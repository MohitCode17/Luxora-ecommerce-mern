import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ShoppingProductCard = ({ product }) => {
  const discount =
    product?.salePrice > 0
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  return (
    <Card className="w-full max-w-[250px] mx-auto hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="relative group">
        {/* Image with zoom effect on hover */}
        <div className="relative overflow-hidden h-[260px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
              {discount}% OFF
            </div>
          )}
        </div>

        <CardContent className="p-4 min-h-[120px] flex flex-col justify-between">
          {/* Product Title */}
          <h2 className="text-base font-medium mb-1 text-gray-800 group-hover:text-gray-900 transition-colors duration-300 line-clamp-1">
            {product?.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product?.description}
          </p>

          {/* Price Section */}
          <div className="flex justify-between items-center">
            <span
              className={`text-base font-medium ${
                product?.salePrice > 0
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <div className="flex items-center">
                <span className="text-lg font-bold text-green-600">
                  ${product?.salePrice}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer with Add to Cart Button */}
        <CardFooter className="p-4 flex justify-center">
          <Button className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-2 rounded-md font-semibold">
            Add to cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductCard;
