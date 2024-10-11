import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { BookOpen } from 'lucide-react';

export function Header() {
	return (
		<header className="container mx-auto px-4 lg:px-6 h-14 flex items-center">
			<Link className="flex items-center justify-center" to="#">
				<BookOpen className="h-6 w-6 text-red-600" />
				<span className="ml-2 text-2xl font-bold text-red-600">EduFlix</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6 items-center">
				<Link
					className="text-sm font-medium hover:underline underline-offset-4"
					to="#"
				>
					Features
				</Link>
				<Link
					className="text-sm font-medium hover:underline underline-offset-4"
					to="#"
				>
					Pricing
				</Link>
				<Link
					className="text-sm font-medium hover:underline underline-offset-4"
					to="#"
				>
					About
				</Link>
				<Link to="/auth/login" className="ml-4">
					<Button variant="outline">Login</Button>
				</Link>
			</nav>
		</header>
	);
}
