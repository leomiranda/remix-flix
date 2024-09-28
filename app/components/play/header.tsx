import { Link } from '@remix-run/react';
import { BookOpen, Bell, User } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { CategoriesMenu } from './categories-menu';
import { SearchForm } from './search-form';

interface HeaderProps {
	categories: string[];
	selectedCategory: string;
	onCategorySelect: (category: string) => void;
}

export function Header({
	categories,
	selectedCategory,
	onCategorySelect,
}: HeaderProps) {
	return (
		<header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-gray-900 z-10">
			<Link className="flex items-center justify-center" to="#">
				<BookOpen className="h-6 w-6 text-red-600" />
				<span className="ml-2 text-2xl font-bold text-red-600">EduFlix</span>
			</Link>
			<CategoriesMenu
				categories={categories}
				selectedCategory={selectedCategory}
				onCategorySelect={onCategorySelect}
			/>
			<div className="ml-auto flex items-center gap-4">
				<SearchForm />
				<Button variant="ghost" size="icon" className="hidden sm:inline-flex">
					<Bell className="h-5 w-5" />
				</Button>
				<Button variant="ghost" size="icon">
					<User className="h-5 w-5" />
				</Button>
			</div>
		</header>
	);
}
