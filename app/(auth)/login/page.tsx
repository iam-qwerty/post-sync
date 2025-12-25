import { Suspense } from "react";
import LoginForm from "../_components/login-form";

export default function SignUpPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}