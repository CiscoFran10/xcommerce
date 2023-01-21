import React from "react";
import Image from "next/image";

interface CardProps {
	name: string;
	price: number;
	sales: number;
}

const Card = ({ name, price, sales }: CardProps) => {
	return (
		<li className="list-none flex-shrink-0 w-[180px] flex flex-col items-center ">
			<Image width={192} height={173} src="/assets/product.svg" alt={name} />

			<div className="px-2.5 w-full">
				<div className="flex justify-between mb-1">
					<span className="text-sm font-semibold text-gray-100">
						R$ ${price}
					</span>
					<span className="text-sm font-normal text-gray-200">
						{sales} vendas
					</span>
				</div>

				<h3 className="text-primary-100 text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
					{name}
				</h3>
			</div>
		</li>
	);
};

export default Card;
