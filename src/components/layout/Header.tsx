import React from "react";
import Image from "next/image";

const Header = () => {
	return (
		<div className="bg-dark  border-b border-b-white/10  ">
			<header className="container py-6 flex justify-between items-center">
				<div>
					<Image height={18} width={71} src={"/assets/logo.svg"} alt="xco+" />
				</div>

				<div className="flex items-center gap-4">
					<Image
						height={40}
						width={40}
						src={"/assets/Avatar.svg"}
						alt="Minha foto de perfil"
					/>

					<nav aria-label="Menu">
						<button className="flex flex-col items-center">
							<Image
								height={20}
								width={20}
								src={"/assets/chevron-down.svg"}
								alt="Botão de menu"
							/>
						</button>
					</nav>
				</div>
			</header>
		</div>
	);
};

export default Header;
