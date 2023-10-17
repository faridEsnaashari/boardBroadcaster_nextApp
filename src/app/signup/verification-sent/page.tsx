"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => router.replace("/login"), []);

  return (
    <p>
      A verification link sent to your email. Please check your email and click
      on that link to verify your email.
    </p>
  );
}
