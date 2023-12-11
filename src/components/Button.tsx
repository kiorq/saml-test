interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = ({ text, onClick }: ButtonProps) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="tw-py-2 tw-px-5 tw-w-full tw-bg-primary tw-rounded-lg tw-text-white tw-font-medium hover:tw-opacity-90 focus:tw-opacity-70"
  >
    {text}
  </button>
);

export default Button;
