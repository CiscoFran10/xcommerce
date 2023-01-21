import { useProducts } from "@/context/products";
import Image from "next/image";
import { useQuery } from "react-query";
import React from "react";

const SearchInput = () => {
	const { searchValue, setSearchValue, setSearchData } = useProducts();

	const { isLoading } = useQuery([searchValue], async () => {
		if (searchValue.length > 0) {
			const res = await fetch(`/api/products/search?query=${searchValue}`);
			const data = await res.json();
			setSearchData(data);
		}
	});

	return (
		<label className="relative">
			<span className="sr-only">Search</span>
			<input
				type="text"
				className="bg-white h-[50px] w-full rounded-lg text-base font-normal transition-all placeholder:text-base placeholder:text-gray-100 outline-none focus:shadow-[0_0_4px_2px_#235EE7] pl-16 pr-4 md:w-[428px]"
				value={searchValue}
				placeholder="Buscar por produtos"
				onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
					setSearchValue(target.value)
				}
			/>
			<Image
				className="absolute inset-0 left-5 top-3"
				width={24}
				height={24}
				src="/assets/search.svg"
				alt="Search icon"
			/>
			{!isLoading && (
				<span className="absolute inset-0 right-0-5 top-3 border-b-dark rounded-full animate-spin"></span>
			)}
		</label>
	);
};

export default SearchInput;
