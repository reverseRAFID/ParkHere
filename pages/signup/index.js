import React from "react";
import Logo from "../../assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const inter = Inter({
  display: "swap",
  strategy: "selfHosted",
  weights: [400, 500, 700],
  subsets: ["latin"],
});

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export default function Signup() {
  const [page, setPage] = React.useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    console.log(data);
  };
  return (
    <div className={`flex justify-center bg-[#FAFEFC] ${inter.className}`}>
      <div className="flex flex-col w-full max-w-screen-2xl px-4 lg:px-2 py-6">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" className="cursor-pointer" />
        </Link>
        <div className="flex flex-col h-[90vh] justify-center items-center text-center">
          <div className="font-semibold text-3xl py-2">Create Your Account</div>
          <div>Login to start booking parking spots with ease.</div>
          
          

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="pt-8">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Name"
                          className={`rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw] ${
                            form.formState.errors.name ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <FormMessage className="text-red-500 text-xs text-right">
                          {form.formState.errors.name.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-3">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className={`rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw] ${
                            form.formState.errors.email ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.email && (
                        <FormMessage className="text-red-500 text-xs text-right">
                          {form.formState.errors.email.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-3">
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                          className={`rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw] ${
                            form.formState.errors.password ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.password && (
                        <FormMessage className="text-red-500 text-xs text-right">
                          {form.formState.errors.password.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-3">
                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm Password"
                          className={`rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw] ${
                            form.formState.errors.confirmPassword ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.confirmPassword && (
                        <FormMessage className="text-red-500 text-xs text-right">
                          {form.formState.errors.confirmPassword.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-3">
                <Button className="rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]">
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-sm">
            or,{" "}
            <Link href={"/login"}>
              <span className="font-bold">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
