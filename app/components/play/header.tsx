import { Form, Link, useRouteLoaderData } from '@remix-run/react';
import { BookOpen, Bell, User, LogOut, CreditCard } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { CategoriesMenu } from './categories-menu';
import { SearchForm } from './search-form';
import { UserData } from '~/types/user';

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
	const data = useRouteLoaderData('routes/play') as UserData;

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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size="icon">
							<Avatar>
								<AvatarImage src={data?.user.imageUrl || ''} alt="User" />
								<AvatarFallback>
									<User className="h-5 w-5" />
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-[200px]">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link to="/plans" className="flex items-center w-full">
								<CreditCard className="mr-2 h-4 w-4" />
								<span>Plans</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Form method="post" action="/auth/logout" className="w-full">
								<button type="submit" className="flex items-center w-full">
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</button>
							</Form>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
