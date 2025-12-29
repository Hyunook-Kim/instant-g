type Props = {
  text: string;
  onClick: () => void;
  isRed?: boolean;
};

export default function Button({ text, onClick, isRed }: Props) {
  return (
    <button
      className={`rounded-md border-none px-8 py-2 font-bold leading-4 text-white ${isRed ? "bg-red-500" : "bg-sky-500"}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
