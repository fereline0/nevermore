import SignIn from "@/components/screens/SignIn/page";
import Loading from "@/components/shared/Loading/page";
import { Suspense } from "react";

export default function signIn() {
  return (
    <Suspense fallback={<Loading />}>
      <SignIn />
    </Suspense>
  );
}
