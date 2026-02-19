"use client";

import { AuthUser } from "@/models/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import { useState } from "react";
import Image from "next/image";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [file, setFile] = useState<File>();
  const [isDragging, setIsDragging] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log("onChange", files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log("drop", files[0]);
    }
  };

  return (
    <section className="mt-6 flex w-full max-w-xl flex-col items-center">
      <PostUserAvatar image={image ?? ""} username={username} />
      <form className="mt-2 flex w-full flex-col">
        <input
          className="hidden"
          id="input-upload"
          name="input"
          type="file"
          accept="image/*"
          onChange={onInputChange}
        />
        <label
          className={`flex h-60 w-full flex-col items-center justify-center ${!file && "border-2 border-dashed border-sky-500"} `}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className="pointer-events-none absolute inset-0 z-10 bg-sky-500/20" />
          )}
          {file ? (
            <div className="relative aspect-square w-full">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          ) : (
            <div className="pointer-events-none flex flex-col items-center">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
        </label>
        <textarea
          className="border border-neutral-300 text-lg outline-none"
          id="input-text"
          name="text"
          required
          rows={10}
          placeholder="Write a caption..."
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
