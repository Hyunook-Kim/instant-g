type Props = {
  text: string;
  onClick: () => void;
  isRed?: boolean;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  isRed,
  disabled = false,
}: Props) {
  return (
    <button
      className={`${disabled && "opacity-80"} rounded-md border-none px-8 py-2 font-bold leading-4 text-white ${isRed ? "bg-red-500" : "bg-sky-500"}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
