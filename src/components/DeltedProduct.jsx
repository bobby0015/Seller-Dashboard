import React, { useContext, useRef } from "react";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { authContext } from "@/context/authContext";

const DeltedProduct = ({ productId }) => {
  const { setUpdateState, updateState } = useContext(authContext);
  const cancelRef = useRef(null);

  const deleteProduct = async () => {
    if (!productId) {
      return;
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/seller/product/delete/${productId}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          updateState ? setUpdateState(false) : setUpdateState(true);
          setTimeout(() => {
            cancelRef.current?.click();
          }, [2000]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AlertDialogContent className={`max-w-[30%]`}>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete the product. If, yes then click on
          delete button below to delete.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
        <Button onClick={deleteProduct} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeltedProduct;
