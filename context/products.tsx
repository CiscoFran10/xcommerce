import React from "react";
import { Data, Product } from "@/api/data";
import { toast } from "react-toastify";

interface ProductsProviderData {
	searchValue: string;
	searchData: Product[];
	setSearchData: React.Dispatch<React.SetStateAction<Product[]>>;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	getProducts: (page: number) => Promise<Data>;
	createProduct: (data: Product) => Promise<void>;
	createProductState: boolean;
	setCreateProductState: React.Dispatch<React.SetStateAction<boolean>>;
	addFavorite: (data: Product) => Promise<any>;
	removeFavorite: (data: Product) => Promise<any>;
	getFavorites: () => Promise<any>;
}

const ProductsContext = React.createContext<ProductsProviderData>(
	{} as ProductsProviderData
);

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
	const [searchValue, setSearchValue] = React.useState("");
	const [searchData, setSearchData] = React.useState<Product[]>([]);
	const [createProductState, setCreateProductState] = React.useState(false);

	const getProducts = async (page: number) => {
		const res = await fetch(`/api/products?page=${page}`);
		const data: Data = await res.json();

		if (!res.ok) throw new Error(res.statusText);
		return data;
	};

	const getFavorites = async () => {
		const res = await fetch("/api/favorites");
		const data = await res.json();

		if (!res.ok) throw new Error(res.statusText);
		return data;
	};

	const createProduct = async (data: Product) => {
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) throw new Error(res.statusText);

		toast.success("Produto criado com sucesso");
		return res.json();
	};

	const addFavorite = async (data: Product) => {
		const res = await fetch("/api/favorites", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) throw new Error(res.statusText);

		toast.success("Produto adicionado aos favoritos");
		return res.json();
	};

	const removeFavorite = async (data: Product) => {
		const res = await fetch("/api/favorites", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) throw new Error(res.statusText);

		toast.success("Produto removido dos favoritos");
		return res.json();
	};

	return (
		<ProductsContext.Provider
			value={{
				getFavorites,
				searchValue,
				setSearchValue,
				searchData,
				createProductState,
				setCreateProductState,
				getProducts,
				createProduct,
				setSearchData,
				addFavorite,
				removeFavorite,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsProvider;

export const useProducts = () => React.useContext(ProductsContext);
