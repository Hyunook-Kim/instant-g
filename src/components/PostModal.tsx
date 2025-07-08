import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ children, onClose }: Props) {
  return (
    <section
      className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="fixed right-0 top-0 p-8 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
