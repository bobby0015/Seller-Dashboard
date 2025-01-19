import { authContext } from "@/context/authContext";
import React, { useContext, useEffect, useReducer } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import UpdateProductForm from "@/components/UpdateProductForm";
import DeltedProduct from "@/components/DeltedProduct";

const Shop = () => {
  const { sellerInfo, loadingState } = useContext(authContext);
  const { updateState } = useContext(authContext);

  // Reducer to manage products
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PRODUCT_INFO":
        return action.payload; // Update products with fetched data
      default:
        return state;
    }
  };

  const [products, dispatch] = useReducer(reducer, []); // Initialize with an empty array

  useEffect(() => {
    const fetchProducts = async () => {
      if (sellerInfo) {
        const productData = await Promise.all(
          sellerInfo.seller.products.map(async (pId) => {
            const response = await fetch(
              `http://localhost:8080/seller/product/info/${pId}`
            );
            const data = await response.json();
            return data.product;
          })
        );
        dispatch({ type: "SET_PRODUCT_INFO", payload: productData });
      }
    };

    fetchProducts();
  }, [sellerInfo, updateState]);

  return loadingState || !sellerInfo || !products ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="animate-spin">
        <LoaderCircle className="w-[40px]" />
      </div>
    </div>
  ) : (
    <section>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/create-a-product">
              Add Product
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Manage Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>
            All Products ({sellerInfo.seller.products.length})
          </CardTitle>
          <CardDescription>
            All products of
            <span className="font-medium">
              {" "}
              {sellerInfo.seller.shopName}
            </span>{" "}
            is listed below. Here you can manage your Products.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col-reverse">
          {/* Product List */}
          {products.map((product) => {
            if (!product) {
              return;
            }
            return (
              <div
                key={product._id}
                className="bg-zinc-100 mb-5 flex items-center py-2 px-3 rounded-md"
              >
                <Avatar className="w-24 h-24 border-4 object-top border-green-300 cursor-pointer">
                  <AvatarImage src={product.image} />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>
                <div className="px-4">
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-xs font-semibold">
                    Stock : {product.stock} units
                  </p>
                  <div className="flex my-1">
                    <p className="text-xs font-semibold mr-2">
                      Price: ₹ {product.price}
                    </p>
                    <p className="text-xs font-semibold">
                      Discount : {product.discount}% off
                    </p>
                  </div>
                  <div className="flex mt-1">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-sm text-blue-500 hover:underline cursor-pointer font-semibold">
                          Update
                        </button>
                      </AlertDialogTrigger>
                      <UpdateProductForm productId={product._id} />
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-sm text-red-500 hover:underline cursor-pointer font-semibold ml-3">
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <DeltedProduct productId={product._id} />
                    </AlertDialog>
                  </div>
                </div>
              </div>
            );
          })}
          {/* TODO: Implement product list */}
        </CardContent>
      </Card>
    </section>
  );
};

export default Shop;
