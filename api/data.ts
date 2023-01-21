export interface Product {
	name: string;
	code: string;
	sales: number;
	price: number;
	stock: number;
	id?: string;
}

export interface Data {
	products: Product[];
	meta: {
		page: number;
		perPage: number;
		total: number;
	};
}

const productsList: Product[] = [
	{
		name: "Iphone 14",
		code: "MLB123456",
		sales: 150,
		price: 31.67,
		stock: 3,
		id: "1",
	},
	{
		name: "Notebook Dell G5",
		code: "TLB124456",
		sales: 120,
		price: 93.67,
		stock: 5,
		id: "2",
	},
	{
		name: "Smart TV LG",
		code: "MSUH23456",
		sales: 60,
		price: 45.67,
		stock: 10,
		id: "3",
	},
	{
		name: "Camera Fotografica",
		code: "MHIB63456",
		sales: 30,
		price: 60.67,
		stock: 20,
		id: "4",
	},
	{
		name: "Ventilador Philco",
		code: "MHHB68974",
		sales: 70,
		price: 30.67,
		stock: 24,
		id: "5",
	},
	{
		name: "Playstation 5",
		code: "MHJB78974",
		sales: 100,
		price: 80.67,
		stock: 100,
		id: "6",
	},
];

export default productsList;
