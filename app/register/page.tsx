import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Business Account | SecureLink",
  description: "Create a SecureLink partner account to unlock wholesale B2B pricing models and direct quotations.",
};

export default function RegisterPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center font-sans">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
