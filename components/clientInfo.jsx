"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import React from "react";


// Validation Schema
const FormSchema = z.object({
  firstname: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastname: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phoneno: z.string().min(2, { message: "Phone number must be at least 2 characters." }),
  emailaddress: z.string().email({ message: "Invalid email address." }),
  vehiclemodel: z.string().min(2, { message: "Vehicle model must be at least 2 characters." }),
  vehiclereg: z.string().min(2, { message: "Vehicle registration must be at least 2 characters." }),
  whenpark: z.string().min(2, { message: "Parking time must be at least 2 characters." }),
  durationofpark: z.string().min(2, { message: "Parking duration must be at least 2 characters." }),
  payment: z.string().min(2, { message: "Payment details must be at least 2 characters." }),
});

const ClientInfo = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      emailaddress: "",
      vehiclemodel: "",
      vehiclereg: "",
      whenpark: "",
      durationofpark: "",
      payment: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log("Form submitted:", data))}
        className="w-full space-y-6"
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name:</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name:</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number:</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Address */}
        <FormField
          control={form.control}
          name="emailaddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address:</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vehicle Model */}
        <FormField
          control={form.control}
          name="vehiclemodel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Model:</FormLabel>
              <FormControl>
                <Input placeholder="Enter vehicle model" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vehicle Registration */}
        <FormField
          control={form.control}
          name="vehiclereg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Registration:</FormLabel>
              <FormControl>
                <Input placeholder="Enter vehicle registration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* When Park */}
        <FormField
          control={form.control}
          name="whenpark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When Park:</FormLabel>
              <FormControl>
                <Input placeholder="Enter parking time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration of Park */}
        <FormField
          control={form.control}
          name="durationofpark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration of Park:</FormLabel>
              <FormControl>
                <Input placeholder="Enter parking duration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment */}
        <FormField
          control={form.control}
          name="payment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Details:</FormLabel>
              <FormControl>
                <Input placeholder="Enter payment details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>

      </form>
    </Form>
  );
};

export default ClientInfo;
