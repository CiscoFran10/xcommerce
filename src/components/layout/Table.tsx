import React from "react";
import Pagination from "./Pagination";
import TableItem from "./TableItem";
import makeServer from "@/api/server";

import { useProducts } from "@/context/products";
import { useQuery } from "react-query";
import Loading from "../utils/Loading";

const Table = () => {
	const { searchValue, searchData, getProducts, createProductState } =
		useProducts();
	const [tablePage, setTablePage] = React.useState(1);

	const { isLoading, error, data } = useQuery(
		[tablePage, createProductState],
		async () => {
			await makeServer;
			return getProducts(tablePage);
		}
	);

	const renderList = () => {
		if (searchValue) {
			return searchData;
		} else return data?.products;
	};

	if (isLoading) return <Loading />;
	if (error) return <p>Houve algum erro</p>;
	if (data) {
		return (
			<>
				<div className="flex w-full justify-between items-center mb-9">
					<h2 className="text-2xl font-bold text-primary-200">
						Todos os produtos
					</h2>
					<Pagination
						total={data.meta.total}
						page={tablePage}
						setPage={setTablePage}
					/>
				</div>

				<div className="relative overflow-x-auto bg-dark-gry py-7  md:px-6 w-full min-h-[580px] ">
					<table className="w-full text-sm min-w-[680px] text-left text-gray-200">
						<caption className="sr-only">
							Nossos Produtos
							<p>Explore a lista de produtos da xco</p>
						</caption>
						<thead className="border-b border-black/10">
							<tr>
								<th
									scope="col"
									className=" font-semibold text-gray-100 px-6 py-4"
								>
									IDENTIFICAÇÃO
								</th>
								<th
									scope="col"
									className=" font-semibold text-gray-100 px-6 py-4"
								>
									PREÇO
								</th>
								<th
									scope="col"
									className=" font-semibold text-gray-100 px-6 py-4"
								>
									VENDAS
								</th>
								<th
									scope="col"
									className=" font-semibold text-gray-100 px-6 py-4"
								>
									ESTOQUE
								</th>
							</tr>
						</thead>

						<tbody>
							{searchValue && searchData.length === 0 ? (
								<tr>
									<td>
										<p className="absolute top-1/3 left-[37%] text-primary-200 text-lg font-semibold">
											Nenhum produto encontrado
										</p>
									</td>
								</tr>
							) : (
								renderList()?.map(({ name, sales, price, stock, code, id }) => (
									<TableItem
										id={id}
										key={id}
										name={name}
										sales={sales}
										price={price}
										stock={stock}
										code={code}
									/>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className="w-full flex justify-end">
					<p>
						Página {tablePage} de {data.meta.total}
					</p>
				</div>
			</>
		);
	} else return null;
};

export default Table;
