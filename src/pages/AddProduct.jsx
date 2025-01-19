import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "@/utils/messageHandler";
import { useMutation } from "@tanstack/react-query";
import { uploadImage, uploadProduct } from "@/http/api";
import { authContext } from "@/context/authContext";
import { LoaderCircle } from "lucide-react";

const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home-kitchen", name: "Home & Kitchen" },
  { id: "books", name: "Books" },
  { id: "beauty", name: "Beauty & Personal Care" },
];

const subcategories = {
  electronics: [
    { id: "mobiles", name: "Mobiles & Accessories" },
    { id: "computers", name: "Computers & Tablets" },
    { id: "gaming", name: "Gaming" },
    { id: "tv", name: "TV & Audio" },
  ],
  fashion: [
    { id: "mens-clothing", name: "Men's Clothing" },
    { id: "womens-clothing", name: "Women's Clothing" },
    { id: "kids-clothing", name: "Kids' Clothing" },
    { id: "footwear", name: "Footwear" },
  ],
  "home-kitchen": [
    { id: "furniture", name: "Furniture" },
    { id: "appliances", name: "Home Appliances" },
    { id: "decor", name: "Home Décor" },
    { id: "kitchen-tools", name: "Kitchen Tools" },
  ],
  books: [
    { id: "fiction", name: "Fiction" },
    { id: "non-fiction", name: "Non-Fiction" },
    { id: "academic", name: "Academic" },
    { id: "kids-books", name: "Children's Books" },
  ],
  beauty: [
    { id: "skincare", name: "Skincare" },
    { id: "haircare", name: "Haircare" },
    { id: "makeup", name: "Makeup" },
    { id: "fragrances", name: "Fragrances" },
  ],
};

const AddProduct = () => {
  const { sellerId, loadingState,setUpdateState,updateState } = useContext(authContext);
  const ProductNameRef = useRef(null);
  const ProductPriceRef = useRef(null);
  const ProductDescriptionRef = useRef(null);
  const ProductBrandRef = useRef(null);
  const ProductWarrantyRef = useRef(null);
  const ProductDiscountRef = useRef(null);
  const [subcategory, setSubcategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const ProductStockRef = useRef(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  const formData = new FormData();
  formData.append("file", selectedFile);

  const getSelectedCategory = (value) => {
    setCategory(value);
    setSubcategory(subcategories[value]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const mutationProduct = useMutation({
    mutationFn: uploadProduct,
    onSuccess: (response) => {
      handleSuccess(response.data.message);

      // Reset the input fields using refs
      ProductNameRef.current.value = "";
      ProductPriceRef.current.value = "";
      ProductDescriptionRef.current.value = "";
      ProductBrandRef.current.value = "";
      ProductWarrantyRef.current.value = "";
      ProductDiscountRef.current.value = "";
      ProductStockRef.current.value = "";

      // Reset state values
      setSubcategory([]);
      setSelectedFile(null);
      setCategory(null);
      setSubCategory(null);
      if(updateState){
        setUpdateState(false);
      }else{
        setUpdateState(true);
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      handleError(errorMessage);
    },
  });

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (response) => {
      if (!response.data.image_url) {
        handleError("Image upload failed");
        return;
      } else {
        const image = response.data.image_url;
        const name = ProductNameRef.current?.value;
        const price = ProductPriceRef.current?.value;
        const stock = ProductStockRef.current?.value;
        const description = ProductDescriptionRef.current?.value;
        const brand = ProductBrandRef.current?.value;
        const warranty = ProductWarrantyRef.current?.value;
        const discount = ProductDiscountRef.current?.value;
        const productData = {
          sellerId,
          image,
          name,
          description,
          category,
          subCategory,
          brand,
          warranty,
          price,
          discount,
          stock,
        };
        try {
          mutationProduct.mutate(productData);
        } catch (err) {
          handleError("Failed to add product");
        }
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Images upload failed";
      handleError(errorMessage);
    },
  });

  const handleFormSubmit = () => {
    const name = ProductNameRef.current?.value;
    const price = ProductPriceRef.current?.value;
    const stock = ProductStockRef.current?.value;
    const description = ProductDescriptionRef.current?.value;
    const brand = ProductBrandRef.current?.value;
    const warranty = ProductWarrantyRef.current?.value;
    const discount = ProductDiscountRef.current?.value;
    if (
      !name ||
      !price ||
      !stock ||
      !description ||
      !brand ||
      !warranty ||
      !discount ||
      !category ||
      !subCategory ||
      !selectedFile
    ) {
      handleError("Please fill out all the required fields");
      return;
    }
    if (!sellerId) {
      handleError("Failed to add product");
      return;
    }
    mutation.mutate(formData);
  };

  return loadingState ? (
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
            <BreadcrumbPage>Add Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>Add a Product</CardTitle>
          <CardDescription>
            Add a new product to your store. Fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="product name">Product Title</Label>
              <Input
                ref={ProductNameRef}
                type="text"
                placeholder="Title of the product"
              />
            </div>
            <div className="">
              <Label htmlFor="product picture">Product Image</Label>
              <Input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product description">Product Description</Label>
            <Textarea
              ref={ProductDescriptionRef}
              placeholder="Describe your product here..."
            ></Textarea>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {/* Category */}
            <div>
              <Select onValueChange={getSelectedCategory}>
                <Label htmlFor="product category">Category</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Subcategory */}
            <div>
              <Select onValueChange={(value) => setSubCategory(value)}>
                <Label htmlFor="product subCategory">Sub Category</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Sub Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub Category</SelectLabel>
                    {subcategory.map((sub) => (
                      <SelectItem key={sub.id} value={sub.name}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Brand  */}
            <div>
              <Label htmlFor="product brand">Product Brand</Label>
              <Input ref={ProductBrandRef} type="text" placeholder="Brand" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Price */}
            <div>
              <Label htmlFor="product warranty">Warranty</Label>
              <Input
                ref={ProductWarrantyRef}
                type="number"
                placeholder="24 months"
              />
            </div>
            {/* Quantity */}
            <div>
              <Label htmlFor="product stock">Stock</Label>
              <Input
                ref={ProductStockRef}
                type="number"
                placeholder="256 units"
              />
            </div>
            {/* Weight */}
            <div>
              <Label htmlFor="product price">Price (in ₹ Rs.)</Label>
              <Input
                ref={ProductPriceRef}
                type="number"
                placeholder="₹ 25,600"
              />
            </div>
            {/* Weight Unit */}
            <div>
              <Label htmlFor="product discount">Discount (in %)</Label>
              <Input
                ref={ProductDiscountRef}
                type="number"
                placeholder="discount"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleFormSubmit} disabled={mutation.isPending}>
            {mutation.isPending && <LoaderCircle className="animate-spin" />}
            <span>Add product</span>
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </section>
  );
};

export default AddProduct;
