import React, { useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const isButtonDisabled = comment.length === 0;

  return (
    <form
      className="flex items-center border-t border-neutral-300 px-3"
      onSubmit={handleSubmit}
    >
      <SmileIcon />
      <input
        className="ml-2 w-full border-none p-3 outline-none"
        type="text"
        placeholder="Add a comment..."
        onChange={onInputChange}
        value={comment}
      />
      <button
        className={`ml-2 font-bold ${isButtonDisabled ? "text-sky-300" : "text-sky-500"} `}
        disabled={isButtonDisabled}
      >
        Post
      </button>
    </form>
  );
}
