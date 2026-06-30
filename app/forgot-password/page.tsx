import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | SecureLink",
  description: "Recover your SecureLink business partner account credentials.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
