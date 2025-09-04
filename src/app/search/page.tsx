import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";
import React, { useState } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search User to follow",
};

export default function SearchPage() {
  return <UserSearch />;
}
