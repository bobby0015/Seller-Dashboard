import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authContext } from "@/context/authContext";
import { register } from "@/http/api";
import useTokenStore from "@/store";
import { handleError, handleSuccess } from "@/utils/messageHandler";
import { useMutation } from "@tanstack/react-query";
import { Store } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const CreateShop = () => {
  const navigate = useNavigate();
  const { sellerRegisterInfo } = useContext(authContext);
  const shopNameRef = useRef(null);
  const shopDescriptionRef = useRef(null);
  const shopAddressRef = useRef(null);
  const setToken = useTokenStore((state)=>state.setToken)

  useEffect(()=>{
    if(!sellerRegisterInfo){
      navigate("/register")
      return
    }
  },[sellerRegisterInfo])

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      setToken(response.data.seller_token);
      handleSuccess(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: (error) => {
      console.log(error)
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      handleError(errorMessage);
    },
  });

  const handleShopSubmit = () =>{
    const shopName = shopNameRef.current?.value;
    const shopDesc = shopDescriptionRef.current?.value;
    const shopAddress = shopAddressRef.current?.value;

    if(!shopName || !shopDesc || !shopAddress){
      handleError("Insert Valid Credentials");
      return;
    }
    const data = {...sellerRegisterInfo, shopName, shopDesc, shopAddress};
    mutation.mutate(data);
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create a Shop</CardTitle>
          <CardDescription>
            Create a new Shop to sell your product
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="shopName">Shop name</Label>
            <Input
              ref={shopNameRef}
              id="shopName"
              type="text"
              placeholder="John traders"
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2">Shop Description</Label>
            <Textarea
              ref={shopDescriptionRef}
              placeholder="Tell more about your shop."
              id="message-2"
            />
            <p className="text-xs text-muted-foreground">
              Create a short description of your shop for the customers.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shopAddress">Shop address</Label>
            <Input
              ref={shopAddressRef}
              id="shopAddress"
              type="text"
              placeholder="Washington , CA"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button onClick={handleShopSubmit} className="w-full">
              <Store />
              <span className="ml-2">Build your Shop</span>
            </Button>

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to={"/register"} className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer/>
    </section>
  );
};

export default CreateShop;
