import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	props?: React.HTMLProps<HTMLButtonElement>;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<button
			className="bg-secundary text-base text-white font-normal rounded-lg px-3 py-2 font-primary hover:bg-secundary/50"
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
