import React, { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateProduct, uploadImage } from "@/http/api";

const UpdateProductForm = ({ productId }) => {
  const [updateProductData, setUpdateProductData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const otherMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (response) => {
      if (!response.data.image_url) {
        return;
      }
      const data = {
        ...updateProductData,
        image: response.data.image_url,
        productId,
      };
      console.log(data);
      otherMutation.mutate(data);
    },
  });

  const onSubmit = (data) => {
    if (data.file === undefined) {
      const newdata = { ...data, productId,image:"" };
      console.log(newdata);
      otherMutation.mutate(newdata);
      return;
    } else {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      mutation.mutate(formData);
      setUpdateProductData(data);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <span>Product Id : ({productId})</span>
          <p className="text-sm text-zinc-500">
            Make changes here to update the product details and click continue.
          </p>
          <hr className="mt-2" />
        </AlertDialogTitle>
        <AlertDialogDescription>
          <Card className="w-full py-2">
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        {...register("name")}
                        id="name"
                        s
                        placeholder="Name of your project"
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="product picture">Product Image</Label>
                      <Input
                        {...register("image")}
                        type="file"
                        id="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product description">
                      Product Description
                    </Label>
                    <Textarea
                      {...register("description")}
                      placeholder="Describe your product here..."
                    ></Textarea>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <Label htmlFor="product warranty">Warranty</Label>
                      <Input
                        {...register("warranty")}
                        type="number"
                        placeholder="24 months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product stock">Stock</Label>
                      <Input
                        {...register("stock")}
                        type="number"
                        placeholder="256 units"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product price">Price (in ₹ Rs.)</Label>
                      <Input
                        {...register("price")}
                        type="number"
                        placeholder="₹ 25,600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product discount">Discount (in %)</Label>
                      <Input
                        {...register("discount")}
                        type="number"
                        placeholder="discount"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>Update</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default UpdateProductForm;
