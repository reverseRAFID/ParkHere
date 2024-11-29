
import React from "react";
import Logo from "../../../assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";

const inter = Inter({
  display: "swap",
  strategy: "selfHosted",
  weights: [400, 500, 700],
  subsets: ["latin"],
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 200) {
      const login = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/admin",
      });
    } else {
      form.setError("email", {
        type: "manual",
        message: result.error,
      });
      setLoading(false);
    }
  };

  return (
    <div className={`flex justify-center bg-[#FAFEFC] ${inter.className}`}>
      <div className="flex flex-col w-full max-w-screen-2xl px-4 lg:px-2 py-6">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" className="cursor-pointer" />
        </Link>
        <div className="flex flex-col h-[90vh] justify-center items-center text-center">
          <div className="font-semibold text-3xl py-2">
            Login to Your <span className="text-[#21AD5C]">Admin Account</span>
          </div>
          <div>Login to start managing parking spots with ease.</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="pt-8">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]"
                          {...field}
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
                          type="password"
                          placeholder="Password"
                          className="rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]"
                          {...field}
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
                {loading ?  <Button
                  disabled
                  className="rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]"
                >
                  Logging in...
                </Button>:<Button
                  type="submit"
                  className="rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]"
                >
                  Login
                </Button>}
              </div>
            </form>
          </Form>
          <div className="text-sm">
            or,{" "}
            <Link href={"/admin/signup"}>
              <span className="font-bold">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
