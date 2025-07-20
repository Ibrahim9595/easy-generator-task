type ButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ label, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
};
