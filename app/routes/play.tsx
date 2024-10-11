import { json, LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';
import { Header } from '~/components/play/header';
import { VideoList } from '~/components/play/video-list';
import { Footer } from '~/components/play/footer';
import { categories, videoData } from '~/data/play';
import { useState } from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/',
	});

	return json({ user });
}

export default function MainPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');

	const filteredVideos =
		selectedCategory === 'All'
			? videoData
			: videoData.filter((video) => video.category === selectedCategory);

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<Header
				categories={categories}
				selectedCategory={selectedCategory}
				onCategorySelect={setSelectedCategory}
			/>
			<main className="pt-20 pb-8 px-4 lg:px-6">
				<h1 className="text-3xl font-bold mb-6">Browse Classes</h1>
				<VideoList videos={filteredVideos} />
			</main>
			<Footer />
		</div>
	);
}
