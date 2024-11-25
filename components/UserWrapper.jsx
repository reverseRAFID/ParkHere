"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function UserWrapper({ children }) {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
      return (
        <div>
          Restricted route. Redirecting to /login...
          <br />
          If you're not redirected,{" "}
          <Link href="/login" className="text-[#21AD5C]">
            click here
          </Link>
        </div>
      );
      
    },
  });

  if (!session) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return <>{children}</>;
}
