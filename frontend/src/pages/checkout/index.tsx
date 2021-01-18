const Checkout = () => {
	return (
		<>
			<h1 className="font-bold capitalize text-24 mb-4">Checkout</h1>
			<div className="w-full max-w-500 mx-auto my-0 shadow-md px-4">
				<p className="text-center py-4 border-b border-lightGrey">Order (3 Items)</p>
				<div className="py-4 border-b border-lightGrey">
					<p>Summer Skit Ankara Dress</p>
					<p>$500.00</p>
					<p>Qty: 4</p>
				</div>
				<div className="py-4 border-b border-lightGrey">
					<p>Big Jeans</p>
					<p>$150.00</p>
					<p>Qty: 5</p>
				</div>

				<div className="border-b py-2 border-lightGrey">
					<p>
						<span className="font-bold">Subtotal:</span> $2,750.00
					</p>
					<p>
						<span className="font-bold">Delivery Fee:</span> $10:00
					</p>
				</div>

				<div className="border-b py-2 border-lightGrey">
					<p className="text-center font-extrabold">Total: $2,760.00</p>
				</div>
			</div>
		</>
	);
};

export default Checkout;
