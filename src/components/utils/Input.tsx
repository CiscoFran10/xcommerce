import React from "react";

interface InputProps {
	name?: string;
	label?: string;
	type?: string;
	value?: string;
	placeholder?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	props?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = ({ name, label, ...props }: InputProps) => {
	return (
		<label className="mb-4 block">
			<span className="text-sm font-semibold text-gray-200 mb-1 block">
				{label}
			</span>
			<input
				className="bg-white h-[40px] w-full rounded-lg text-base font-normal transition-all placeholder:text-base placeholder:text-gray-100 outline-none focus:shadow-[0_0_4px_2px_#235EE7] px-4"
				type="text"
				id={name}
				required
				name={name}
				{...props}
			/>
		</label>
	);
};

export default Input;
