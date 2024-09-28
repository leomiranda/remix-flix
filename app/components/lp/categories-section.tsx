export function CategoriesSection() {
	const categories = [
		'Technology',
		'Business',
		'Science',
		'Arts',
		'Languages',
		'Mathematics',
		'History',
		'Health',
	];

	return (
		<section className="py-12 md:py-24 lg:py-32 bg-gray-100">
			<div className="container mx-auto px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
					Popular Categories
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{categories.map((category) => (
						<div
							key={category}
							className="relative aspect-video overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-75" />
							<div className="absolute inset-0 flex items-center justify-center">
								<h3 className="text-2xl font-bold text-white">{category}</h3>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
