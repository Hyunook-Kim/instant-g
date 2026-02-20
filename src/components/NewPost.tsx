"use client";

import { AuthUser } from "@/models/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import { ChangeEvent, FormEvent, DragEvent, useRef, useState } from "react";
import Image from "next/image";
import GridSpinner from "./ui/GridSpinner";
import { useRouter } from "next/navigation";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [file, setFile] = useState<File>();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
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
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts/", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="mt-6 flex w-full max-w-xl flex-col items-center">
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-sky-500/20 pt-[30%] text-center">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="mb-4 w-full bg-red-100 p-4 text-center font-bold text-red-600">
          {error}
        </p>
      )}
      <PostUserAvatar image={image ?? ""} username={username} />
      <form className="mt-2 flex w-full flex-col" onSubmit={handleSubmit}>
        <input
          className="hidden"
          id="input-upload"
          name="input"
          type="file"
          accept="image/*"
          onChange={onInputChange}
        />
        <label
          className={`flex h-60 w-full flex-col items-center justify-center overflow-hidden ${!file && "border-2 border-dashed border-sky-500"} `}
          // className={`flex h-60 w-full flex-col items-center justify-center ${!file && "border-2 border-dashed border-sky-500"} `}
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
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
