"use client";
import { DetailUser } from "@/models/user";
import React from "react";
import useSWR from "swr";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");
  console.log("data", data);
  return <p>FollowingBar</p>;
}
