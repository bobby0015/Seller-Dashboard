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
import { handleError, handleSuccess } from "@/utils/messageHandler";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handleRegisterSubmit = () =>{
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if(!firstName || !lastName || !email || !password || !confirmPassword){
      handleError("Please enter valid credentials");
      return
    }else if(password != confirmPassword){
      handleError("Passwords do not match");
      return
    }
    const data = {firstName,lastName,email,password};
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Create a new Seller account for your business.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex gap-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input ref={firstNameRef} id="firstName" type="text" placeholder="John" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input ref={lastNameRef} id="lastName" type="text" placeholder="Doe" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confrimPassword">Confirm Password</Label>
            <Input
            ref={confirmPasswordRef}
              id="confirmPassword"
              type="text"
              placeholder="Retype Password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Link>
              <Button onClick={handleRegisterSubmit} className="w-full">
                <span className="ml-2">Proceed to create a shop</span>
              </Button>
            </Link>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="underline">
                Log In
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer/>
    </section>
  );
};

export default Register;
