import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,  
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom"; // ✅ added
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/ui/GoogleLogin";
import logo from '@/assets/images/logo-white.png'

const SignIn = () => {

  const dispath = useDispatch()

  const Navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password field required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message)
      }
      dispath(setUser(data.user))
      Navigate(RouteIndex);
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
      <div className=" flex justify-center items-center mb-2">
      <Link to={RouteIndex}>
        <img src={logo} />
      </Link>
      </div>
        <h1 className="text-2xl font-semibold mb-4 text-center">Login into your Account</h1>
        <div className="">
          <GoogleLogin />
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm">
              OR
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mb-5'>
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Don't have an account?</p>
                <Link className="text-blue-500" to={RouteSignUp}>
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;

