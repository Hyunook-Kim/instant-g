"use client";

import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import ColorButton from "@/components/ui/ColorButton";
import { BuiltInProviderType } from "next-auth/providers/index";

// TODO: We can set stricter type settings with this model.
// type props = {
//   providers: Record<
//     LiteralUnion<BuiltInProviderType, string>,
//     ClientSafeProvider
//   >;
// };
type props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignInPage({ providers, callbackUrl }: props) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <ColorButton
          key={provider.id}
          text={`Sign in with ${provider.name}`}
          onClick={() => signIn(provider.id, { callbackUrl })}
          size={"big"}
        />
      ))}
    </>
  );
}
