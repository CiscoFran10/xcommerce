import React from "react";
import Head from "next/head";
import Navlist from "@/src/components/layout/NavList";
import Header from "@/src/components/layout/Header";
import Favorites from "@/src/components/layout/Favorites";

const Favorite = () => {
	return (
		<>
			<Head>
				<title>Xco+ | Favoritos</title>
				<meta name="description" content="Seus produtos favoritos" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Header />
			<main>
				<div className="bg-dark">
					<section className="container">
						<div className="flex flex-col justify-between items-center gap-6 md:flex-row border-b border-b-white/10 py-14">
							<h1 className="text-4xl text-white font-bold">Favoritos</h1>
						</div>

						<div className="flex justify-between items-center py-10">
							<Navlist />
						</div>
					</section>
				</div>

				<section className="container grid mt-10 mb-10 ">
					<div className="relative overflow-x-auto bg-dark-gray py-7 px-3 md:px-6 w-full min-h-[580px]">
						<Favorites />
					</div>
				</section>
			</main>
		</>
	);
};

export default Favorite;
