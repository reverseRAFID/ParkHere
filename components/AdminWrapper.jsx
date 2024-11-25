"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function AdminWrapper({ children }) {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/admin/login");
      return (
        <div>
          Restricted route. Redirecting to /admin/login...
          <br />
          If you're not redirected,{" "}
          <Link href="/admin/login" className="text-[#21AD5C]">
            click here
          </Link>
        </div>
      );
      
    },
  });

  console.log(JSON.stringify(session));

  if (!session) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return <>{children}</>;
}
