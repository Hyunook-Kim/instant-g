import React from "react";

type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div
      className={
        "h-9 w-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full p-[0.1rem]"
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer" // Prevents referrer information from being sent, 이미지에 외부 링크 사용시, 엑스박스 문제 방지
      />
    </div>
  );
}
