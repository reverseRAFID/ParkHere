import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ClientInfo from "./clientInfo";
import React from "react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function onSubmit(data) {
  console.log("Form submitted:", data);
}

const ClientComponent = () => {
  return (
    <div className="flex space-x-6">
      {/* Form 1 */}
      <div className="w-1/3">
        <ClientInfo />
      </div>
    </div>
  );
};

export default ClientComponent;