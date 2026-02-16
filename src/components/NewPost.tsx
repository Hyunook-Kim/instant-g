"use client";

import { AuthUser } from "@/models/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import { useState } from "react";

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
    <section>
      <PostUserAvatar image={image ?? ""} username={username} />
      <form>
        <input
          className="hidden"
          id="input-upload"
          name="input"
          type="file"
          accept="image/*"
          onChange={onInputChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FilesIcon />
          <p>DND image here or click</p>
        </label>
        <textarea
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
