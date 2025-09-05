type Props = {
  isToggled: boolean;
  onToggle: (isToggle: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};
export default function ToggleButton({
  isToggled,
  onToggle,
  onIcon,
  offIcon,
}: Props) {
  return (
    <button onClick={() => onToggle(!isToggled)}>
      {isToggled ? onIcon : offIcon}
    </button>
  );
}
