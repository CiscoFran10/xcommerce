import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Input from "../utils/Input";
import { useProducts } from "@/context/products";
import { useMutation } from "react-query";
import Loading from "../utils/Loading";
import { toast } from "react-toastify";

const Modal = () => {
	const { createProduct, setCreateProductState } = useProducts();
	const [open, setOpen] = React.useState(false);
	const [input, setInput] = React.useState({
		name: "",
		code: "",
		sales: "",
		price: "",
		stock: "",
	});
	const { mutate, isLoading } = useMutation(createProduct, {
		onSuccess: () => {
			setCreateProductState(true);
			setOpen(false);
			setInput({ name: "", code: "", sales: "", price: "", stock: "" });
		},
		onError: () => {
			toast.error("Houve algum error ao criar produto");
		},
	});

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;
		setInput({ ...input, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const product = {
			name: input.name,
			code: input.code,
			sales: +input.sales,
			price: +input.price,
			stock: +input.stock,
		};
		mutate(product);
	};

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button className="bg-secundary text-base text-white font-normal rounded-lg px-4 py-2 font-primary hover:bg-secundary/50">
					Criar Novo
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/40 fixed inset-0 z-60" />
				<Dialog.Content className="bg-light-gray rounded-md shadow-md fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] p-5 min-h-[500px]">
					{isLoading ? (
						<Loading />
					) : (
						<>
							<Dialog.Title className="text-2xl font-bold text-primary-200 mb-6">
								Criar Produto
							</Dialog.Title>
							<Dialog.Description className="sr-only">
								Crie um novo produto e clique para salvar.
							</Dialog.Description>
							<form onSubmit={handleSubmit}>
								<Input
									label="Nome"
									name="name"
									value={input.name}
									onChange={handleChange}
								/>
								<Input
									label="Preço"
									type="number"
									name="price"
									value={input.price}
									onChange={handleChange}
								/>
								<Input
									label="Vendas"
									type="number"
									name="sales"
									value={input.sales}
									onChange={handleChange}
								/>
								<Input
									label="Estoque"
									type="number"
									name="stock"
									value={input.stock}
									onChange={handleChange}
								/>
								<Input
									label="Código"
									name="code"
									value={input.code}
									onChange={handleChange}
								/>

								<button
									type="submit"
									className="bg-secundary text-base text-white font-normal rounded-lg px-10 py-3 font-primary hover:bg-secundary/50 mt-8 block ml-auto"
								>
									Criar
								</button>
							</form>
							<Dialog.Close asChild>
								<button
									className="bg-dark text-base text-white font-normal rounded-lg px-3 py-1 font-primary hover:bg-slate-700 absolute top-5 right-5"
									aria-label="Fechar"
								>
									X
								</button>
							</Dialog.Close>
						</>
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default Modal;
