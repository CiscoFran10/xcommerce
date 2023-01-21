import { createServer, Model } from "miragejs";
import productsList, { Product } from "./data";

const makeServer = () => {
	let server = createServer({
		models: {
			product: Model,
			favorite: Model,
		},

		seeds(server) {
			productsList.map((product) => {
				server.create("product", product);
			});
		},

		routes() {
			this.namespace = "/api";

			this.get("/products", (schema, request) => {
				const page: number = +request.queryParams.page || 1;
				const perPage = 4;

				const products: Product[] = schema.db.products.slice(
					(page - 1) * perPage,
					page * perPage
				);

				return {
					products,
					meta: {
						total: schema.db.products.length / 4,
						page,
						perPage,
					},
				};
			});

			this.get("/favorites", (schema) => {
				const data = localStorage.getItem("favorites");
				if (data) return JSON.parse(data);
				return [];
			});

			this.get("/products/search", (schema, request) => {
				const query = request.queryParams.query;
				const matchingProducts: Product[] = schema.db.products.where(
					(product: Product) => {
						return product.name.toLowerCase().includes(query.toLowerCase());
					}
				);
				return matchingProducts;
			});

			this.post("/products", (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				schema.db.products.insert(attrs);
				return schema.db.products;
			});

			this.post("/favorites", (schema, request) => {
				const product = JSON.parse(request.requestBody);
				let favorites = localStorage.getItem("favorites");
				if (favorites) {
					const newData = JSON.parse(favorites);
					localStorage.setItem(
						"favorites",
						JSON.stringify([...newData, product])
					);
				} else {
					localStorage.setItem("favorites", JSON.stringify([product]));
				}
				return product;
			});

			this.delete("/favorites", (schema, request) => {
				const productId = JSON.parse(request.requestBody).id;
				let favorites = localStorage.getItem("favorites");

				if (favorites) {
					const data = JSON.parse(favorites).filter(
						(product: Product) => product.id !== productId
					);

					localStorage.setItem("favorites", JSON.stringify(data));
				}
				return {};
			});
		},
	});

	return server;
};

export default makeServer;
