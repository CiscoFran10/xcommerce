import React from "react";
import { useMutation, useQuery } from "react-query";
import { Product } from "@/api/data";
import Image from "next/image";
import makeServer from "@/api/server";
import { useProducts } from "@/context/products";
import Loading from "@/src/components/utils/Loading";

const Favorites = () => {
	const { removeFavorite, getFavorites } = useProducts();
	const { data, isLoading, error, refetch } = useQuery(
		["products"],
		async () => {
			await makeServer;
			return getFavorites();
		}
	);
	const { mutate } = useMutation(removeFavorite, {
		onSuccess: () => refetch(),
	});

	const handleClick = async (item: Product) => {
		mutate(item);
	};

	if (error) return <p>Houve algum erro</p>;
	if (isLoading) return <Loading />;
	if (data)
		return (
			<table className="min-w-[680px] w-full text-sm text-left text-gray-200 relative">
				<caption className="sr-only">
					Nossos Produtos
					<p>Explore a lista de produtos da xco</p>
				</caption>
				<thead className="border-b border-black/10">
					<tr>
						<th scope="col" className=" font-semibold text-gray-100 px-6 py-4">
							IDENTIFICAÇÃO
						</th>
						<th scope="col" className=" font-semibold text-gray-100 px-6 py-4">
							PREÇO
						</th>
						<th scope="col" className=" font-semibold text-gray-100 px-6 py-4">
							VENDAS
						</th>
					</tr>
				</thead>

				<tbody>
					{data.length === 0 ? (
						<tr className="absolute top-40 inset-0 flex items-center justify-center text-primary-200 text-lg font-semibold">
							<td>
								<p>Nenhum produto adicionado</p>
							</td>
						</tr>
					) : (
						<>
							{data.map(({ name, sales, price, stock, code, id }: Product) => (
								<tr
									className="[&:not(:last-child)]:border-b border-black/10  hover:bg-slate-200/50 transition-all"
									key={code}
									id={id}
								>
									<th
										scope="row"
										className="flex items-center gap-3 px-6 py-4 whitespace-nowrap"
									>
										<Image
											width={85}
											height={85}
											src="/assets/product-small.svg"
											alt={name}
										/>
										<span>
											<h3 className=" font-semibold text-primary-100">
												{name}
											</h3>
											<span className=" font-semibold ">#{code}</span>
										</span>
									</th>

									<td className="px-6 py-4  font-normal ">
										R$ {price.toLocaleString()}
									</td>

									<td className="px-6 py-4">
										<span className="block   font-semibold">
											Total de {Math.floor(sales * price)}
										</span>
										<span className=" font-normal">{sales} vendas</span>
									</td>

									<td className="px-6 py-4">
										<button
											onClick={() =>
												handleClick({
													name,
													sales,
													code,
													price,
													stock,
													id,
												})
											}
											className="hover:scale-110 transition-all"
											aria-label="Favoritar Produto"
										>
											<svg
												className={"fill-secundary"}
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
													stroke="#101828"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</td>
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>
		);
	else return null;
};

export default Favorites;
