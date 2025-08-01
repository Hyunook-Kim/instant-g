import { AuthUser } from "@/models/User";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  user: AuthUser;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg leading-4 text-neutral-500">{name}</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-neutral-500">
        About • Help • Press • API • Jobs • Privacy • Terms • Location •
        Language
      </p>
      <p className="mt-8 text-sm font-bold text-neutral-500">
        @Copyright INSTANT from Gram
      </p>
    </>
  );
}
