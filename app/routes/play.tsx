import { LoaderFunctionArgs } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { authenticator } from '~/utils/auth.server';
import { BookOpen, Search, Bell, User, ChevronDown } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';

export async function loader({ request }: LoaderFunctionArgs) {
	await authenticator.isAuthenticated(request, {
		failureRedirect: '/',
	});

	return {};
}

const categories = [
	'All',
	'Computer Science',
	'Mathematics',
	'Physics',
	'Biology',
	'History',
	'Literature',
	'Art',
	'Music',
];

const videoData = [
	{
		id: 1,
		title: 'Introduction to Python Programming',
		category: 'Computer Science',
		duration: '1h 30m',
	},
	{
		id: 2,
		title: 'Calculus: Limits and Derivatives',
		category: 'Mathematics',
		duration: '2h 15m',
	},
	{
		id: 3,
		title: 'Quantum Mechanics Fundamentals',
		category: 'Physics',
		duration: '1h 45m',
	},
	{
		id: 4,
		title: 'Cell Biology and Genetics',
		category: 'Biology',
		duration: '2h',
	},
	{
		id: 5,
		title: 'World War II: A Comprehensive Overview',
		category: 'History',
		duration: '3h',
	},
	{
		id: 6,
		title: "Shakespeare's Tragedies",
		category: 'Literature',
		duration: '2h 30m',
	},
	{ id: 7, title: 'Modern Art Movements', category: 'Art', duration: '1h 15m' },
	{
		id: 8,
		title: 'Music Theory Basics',
		category: 'Music',
		duration: '1h 45m',
	},
];

export default function MainPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');

	const filteredVideos =
		selectedCategory === 'All'
			? videoData
			: videoData.filter((video) => video.category === selectedCategory);

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-gray-900 z-10">
				<Link className="flex items-center justify-center" to="#">
					<BookOpen className="h-6 w-6 text-red-600" />
					<span className="ml-2 text-2xl font-bold text-red-600">EduFlix</span>
				</Link>
				<nav className="ml-6 flex gap-2 sm:gap-4 items-center overflow-x-auto">
					{categories.slice(0, 3).map((category) => (
						<Button
							key={category}
							variant="ghost"
							className={`text-sm ${
								selectedCategory === category ? 'text-white' : 'text-gray-400'
							} whitespace-nowrap`}
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</Button>
					))}
					<div className="hidden sm:block">
						{categories.slice(3, 5).map((category) => (
							<Button
								key={category}
								variant="ghost"
								className={`text-sm ${
									selectedCategory === category ? 'text-white' : 'text-gray-400'
								} whitespace-nowrap`}
								onClick={() => setSelectedCategory(category)}
							>
								{category}
							</Button>
						))}
					</div>
					<div className="hidden md:block">
						{categories.slice(5, 7).map((category) => (
							<Button
								key={category}
								variant="ghost"
								className={`text-sm ${
									selectedCategory === category ? 'text-white' : 'text-gray-400'
								} whitespace-nowrap`}
								onClick={() => setSelectedCategory(category)}
							>
								{category}
							</Button>
						))}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="text-sm text-gray-400">
								More <ChevronDown className="ml-1 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-gray-800 border-gray-700">
							{categories.slice(3).map((category) => (
								<DropdownMenuItem
									key={category}
									className="text-sm text-gray-300 hover:text-white focus:text-white focus:bg-gray-700"
									onClick={() => setSelectedCategory(category)}
								>
									{category}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
				<div className="ml-auto flex items-center gap-4">
					<form className="relative hidden sm:block">
						<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<Input
							type="search"
							placeholder="Search classes..."
							className="pl-8 bg-gray-800 text-white placeholder-gray-400 border-gray-700"
						/>
					</form>
					<Button variant="ghost" size="icon" className="hidden sm:inline-flex">
						<Bell className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon">
						<User className="h-5 w-5" />
					</Button>
				</div>
			</header>
			<main className="pt-20 pb-8 px-4 lg:px-6">
				<h1 className="text-3xl font-bold mb-6">Browse Classes</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredVideos.map((video) => (
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
			</main>
			<footer className="py-6 px-4 lg:px-6 border-t border-gray-800">
				<p className="text-center text-sm text-gray-400">
					© 2024 EduFlix Inc. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
