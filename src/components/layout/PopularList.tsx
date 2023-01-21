import React from "react";
import Card from "../utils/Card";
import Pagination from "./Pagination";
import { useQuery } from "react-query";
import makeServer from "@/api/server";
import { useProducts } from "@/context/products";
import Loading from "../utils/Loading";

const PopularList = () => {
	const { getProducts } = useProducts();
	const [page, setPage] = React.useState(1);

	const { isLoading, error, data } = useQuery([page], async () => {
		await makeServer;
		return getProducts(page);
	});

	if (error) return <p>Houve algum erro</p>;
	if (isLoading) return <Loading />;
	if (data) {
		const sortedData = data?.products?.sort((a, b) =>
			a.sales > b.sales ? -1 : 1
		);

		return (
			<>
				<div className="flex w-full justify-between items-center mb-9">
					<h2 className="text-2xl font-bold text-primary-200">Mais vendidos</h2>
					<Pagination total={data.meta.total} page={page} setPage={setPage} />
				</div>

				{isLoading ? (
					<div className="absolute w-full h-full inset-0 flex justify-center items-center z-50">
						<span className="h-12 w-12 border-4 border-transparent border-t-primary-100 rounded-full animate-spin"></span>
					</div>
				) : (
					<ul className="flex overflow-hidden overflow-x-auto xl:grid  xl:grid-cols-2 gap-[30px] bg-dark-gray p-[30px] w-full xl:min-h-[580px]">
						{sortedData?.map(({ name, sales, price, code, id }) => (
							<Card key={id} name={name} sales={sales} price={price} />
						))}
					</ul>
				)}
			</>
		);
	} else return null;
};

export default PopularList;
