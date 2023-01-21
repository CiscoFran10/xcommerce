const Loading = () => {
	return (
		<div className="absolute w-full h-full inset-0 flex justify-center items-center z-50">
			<span className="h-12 w-12 border-4 border-transparent border-t-primary-100 rounded-full animate-spin"></span>
		</div>
	);
};

export default Loading;
