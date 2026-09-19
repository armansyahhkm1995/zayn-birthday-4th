"use client";

import { useRouter } from "next/navigation";
import { ErrorScreen } from "../src/components/screens/error-screen";

export default function GlobalErrorPage() {
  const router = useRouter();

  return (
    <ErrorScreen
      onRetry={() => router.refresh()}
      onBack={() => router.back()}
    />
  );
}
