import React from "react";
import Head from "next/head";
import Navlist from "@/src/components/layout/NavList";
import Table from "@/src/components/layout/Table";
import Header from "@/src/components/layout/Header";
import PopularList from "@/src/components/layout/PopularList";
import Modal from "@/src/components/layout/Modal";
import SearchInput from "@/src/components/layout/SearchInput";

const Home = () => {
	return (
		<>
			<Head>
				<title>Xco+</title>
				<meta
					name="description"
					content="E-commerce de produtos e acessórios"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>
				<div className="bg-dark">
					<section className="container">
						<div className="flex flex-col justify-between items-center gap-6 md:flex-row border-b border-b-white/10 py-14">
							<h1 className="text-4xl text-white font-bold">Produtos</h1>
							<SearchInput />
						</div>

						<div className="flex justify-between items-center py-10">
							<Navlist />
							<Modal />
						</div>
					</section>
				</div>

				<div className="container flex flex-col-reverse xl:grid xl:grid-cols-[427px_1fr] gap-[60px_30px] mt-20 mb-10">
					<section className="relative">
						<PopularList />
					</section>

					<section className="relative">
						<Table />
					</section>
				</div>
			</main>
		</>
	);
};

export default Home;
