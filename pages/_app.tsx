import React from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsProvider from "@/context/products";
import { ToastContainer, toast } from "react-toastify";
import "@/dist/output.css";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import makeServer from "@/api/server";

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient());

	React.useEffect(() => {
		const server = makeServer();

		return () => server.shutdown();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ProductsProvider>
				<Component {...pageProps} />
				<ToastContainer
					position="top-right"
					autoClose={3000}
					limit={1}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					transition={Slide}
					rtl={false}
					theme="light"
				/>
			</ProductsProvider>
		</QueryClientProvider>
	);
}
