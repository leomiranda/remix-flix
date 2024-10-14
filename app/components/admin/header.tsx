import { Link, useNavigate } from '@remix-run/react';
import { BookOpen } from 'lucide-react';
import { Button } from '~/components/ui/button';

export function AdminHeader() {
	const navigate = useNavigate();
	return (
		<header className="bg-white shadow">
			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
				<Link className="flex items-center justify-center" to="#">
					<BookOpen className="h-6 w-6 text-red-600" />
					<span className="ml-2 text-2xl font-bold text-red-600">EduFlix</span>
				</Link>
				<Button variant="outline" onClick={() => navigate(-1)}>
					<svg
						className="h-5 w-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back
				</Button>
			</div>
		</header>
	);
}
