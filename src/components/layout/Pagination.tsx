import Image from "next/image";
import React from "react";

interface PaginationProps {
	page: number;
	total: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, total, setPage }: PaginationProps) => {
	const handleNext = () => {
		if (page < total) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const handlePrev = () => {
		if (page > 1) setPage((prevPage) => prevPage - 1);
	};

	return (
		<nav aria-label="Navegação Paginada">
			<ul className="flex items-center gap-3">
				<li>
					<button
						onClick={handlePrev}
						className="p-1"
						aria-label="Página Anterior"
					>
						<Image
							className="rotate-180 pointer-events-none"
							src="/assets/arrow-right.svg"
							width={20}
							height={20}
							alt="Arrow icon"
						/>
					</button>
				</li>

				<li>
					<button
						onClick={handleNext}
						className="p-1"
						aria-label="Proxima página"
					>
						<Image
							className="pointer-events-none"
							src="/assets/arrow-right.svg"
							width={20}
							height={20}
							alt="Arrow icon"
						/>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
