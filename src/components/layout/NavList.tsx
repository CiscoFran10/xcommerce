import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navlist = () => {
	const { pathname } = useRouter();

	return (
		<nav aria-label="Navegação Principal">
			<ul className="flex gap-4">
				<li>
					<Link
						href="/"
						className={`text-base text-white font-normal rounded-lg px-3 py-2 block font-primary hover:bg-secundary/50 ${
							pathname === "/" ? "bg-secundary" : "bg-secundary/50"
						}`}
					>
						Todas
					</Link>
				</li>

				<li>
					<Link
						href="favorite"
						className={`text-base text-white font-normal rounded-lg px-3 py-2 block font-primary hover:bg-secundary/50 ${
							pathname === "/favorite" ? "bg-secundary" : "bg-secundary/50"
						}`}
					>
						Favoritos
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navlist;
