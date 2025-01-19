import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const UpdateProductForm = ({ productId }) => {
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
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="">
                      <Label htmlFor="product picture">Product Image</Label>
                      <Input type="file" id="file" accept="image/*" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product description">
                      Product Description
                    </Label>
                    <Textarea placeholder="Describe your product here..."></Textarea>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <Label htmlFor="product warranty">Warranty</Label>
                      <Input type="number" placeholder="24 months" />
                    </div>
                    <div>
                      <Label htmlFor="product stock">Stock</Label>
                      <Input type="number" placeholder="256 units" />
                    </div>
                    <div>
                      <Label htmlFor="product price">Price (in ₹ Rs.)</Label>
                      <Input type="number" placeholder="₹ 25,600" />
                    </div>
                    <div>
                      <Label htmlFor="product discount">Discount (in %)</Label>
                      <Input type="number" placeholder="discount" />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex">
              <Button>Update</Button>
            </CardFooter>
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
