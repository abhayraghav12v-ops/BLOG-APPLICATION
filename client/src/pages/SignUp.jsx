
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
import { Link, useNavigate } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/ui/GoogleLogin";

console.log("API Base URL:", getEnv("VITE_API_BASE_URL"));

const SignUp = () => {
  const navigate = useNavigate();

  // ✅ Form Validation Schema
  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters long"),
      email: z.string().email(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // ✅ useForm Hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ✅ Submit Function
  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/register`,        
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message)
      }
      navigate(RouteSignIn);
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  // ✅ UI
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Create your Account
        </h1>
        <div className="">
          <GoogleLogin />
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm">
             OR
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password again"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            
            <Button type="submit" className="w-full">
              Sign Up
            </Button>

            {/* Link */}
            <div className="mt-4 text-sm flex justify-center items-center gap-2">
              <p>Already have an account?</p>
              <Link className="text-blue-500" to={RouteSignIn}>
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;