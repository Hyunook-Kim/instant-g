import { getProviders } from "next-auth/react";
import ColorButton from "@/components/ui/ColorButton";
import Signin from "./Signin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    // <section className="mt-[20%] flex justify-center">
    <section className="flex min-h-screen items-center justify-center">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
