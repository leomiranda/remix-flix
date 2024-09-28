interface Video {
	id: number;
	title: string;
	category: string;
	duration: string;
}

interface VideoListProps {
	videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{videos.map((video) => (
				<div
					key={video.id}
					className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
				>
					<img
						src={`images/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
							video.title
						)}`}
						alt={video.title}
						width={400}
						height={200}
						className="w-full object-cover"
					/>
					<div className="p-4">
						<h3 className="font-semibold text-lg mb-1">{video.title}</h3>
						<p className="text-sm text-gray-400 mb-2">{video.category}</p>
						<p className="text-sm text-gray-400">{video.duration}</p>
					</div>
				</div>
			))}
		</div>
	);
}
