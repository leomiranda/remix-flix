import { Button } from '~/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface CategoriesMenuProps {
	categories: string[];
	selectedCategory: string;
	onCategorySelect: (category: string) => void;
}

export function CategoriesMenu({
	categories,
	selectedCategory,
	onCategorySelect,
}: CategoriesMenuProps) {
	return (
		<nav className="ml-6 flex gap-2 sm:gap-4 items-center overflow-x-auto">
			{categories.map((category, index) => (
				<Button
					key={category}
					variant="ghost"
					className={`text-sm ${
						selectedCategory === category ? 'text-white' : 'text-gray-400'
					} whitespace-nowrap ${
						index === 0
							? ''
							: index < 3
							? 'hidden md:inline-flex'
							: index < 5
							? 'hidden lg:inline-flex'
							: index < 7
							? 'hidden xl:inline-flex'
							: index < 9
							? 'hidden 2xl:inline-flex'
							: index < 11
							? 'hidden 3xl:inline-flex'
							: 'hidden'
					}`}
					onClick={() => onCategorySelect(category)}
				>
					{category}
				</Button>
			))}
			<div
				className={`
        ${categories.length <= 1 ? 'hidden' : ''}
        ${categories.length <= 3 ? 'md:hidden' : ''}
        ${categories.length <= 5 ? 'lg:hidden' : ''}
        ${categories.length <= 7 ? 'xl:hidden' : ''}
        ${categories.length <= 9 ? '2xl:hidden' : ''}
        ${categories.length <= 11 ? '3xl:hidden' : ''}
      `}
			>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="text-sm text-gray-400 inline-flex"
						>
							<span className="md:hidden">Categories</span>
							<span className="hidden md:inline">More</span>
							<ChevronDown className="ml-1 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-gray-800 border-gray-700">
						{categories.map((category, index) => (
							<DropdownMenuItem
								key={category}
								className={`text-sm text-gray-300 hover:text-white focus:text-white focus:bg-gray-700 ${
									index === 0
										? 'hidden'
										: index < 3
										? 'md:hidden'
										: index < 5
										? 'lg:hidden'
										: index < 7
										? 'xl:hidden'
										: index < 9
										? '2xl:hidden'
										: index < 11
										? '3xl:hidden'
										: ''
								}`}
								onClick={() => onCategorySelect(category)}
							>
								{category}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
