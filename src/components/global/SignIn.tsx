import { SignIn } from "@clerk/nextjs";

export default function CustomSignIn() {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      redirectUrl="/checkout"
    />
  );
}
