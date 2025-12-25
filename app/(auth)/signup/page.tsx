import { Suspense } from "react";
import SignUpForm from "../_components/signup-form";

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  )
}