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
import { Store } from "lucide-react";
import { Link } from "react-router-dom";

const CreateShop = () => {
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
              id="shopName"
              type="text"
              placeholder="John traders"
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2">Shop Description</Label>
            <Textarea placeholder="Tell more about your shop." id="message-2" />
            <p className="text-xs text-muted-foreground">
              Create a short description of your shop for the customers.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shopAddress">Shop address</Label>
            <Input
              id="shopAddress"
              type="text"
              placeholder="Washington , CA"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button className="w-full">
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
    </section>
  );
};

export default CreateShop;
