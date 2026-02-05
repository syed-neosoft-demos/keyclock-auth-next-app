"use client";

import { signIn } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <Login />
    </Suspense>
  );
}

function Login() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!cancelled && !isLoading) {
        setIsLoading(true);
        try {
          await signIn("keycloak", { callbackUrl });
        } finally {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [callbackUrl, isLoading]);

  return <></>;
}
