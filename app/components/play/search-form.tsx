import { Search } from 'lucide-react';
import { Input } from '~/components/ui/input';

export function SearchForm() {
	return (
		<form
			className="min-w-10 relative hidden sm:block"
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) {
					const input = document.getElementById('search-input');
					if (input) {
						input.classList.add('hidden');
					}
				}
			}}
		>
			<Search
				className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer hover:text-gray-400"
				onClick={() => {
					const input = document.getElementById('search-input');
					if (input) {
						input.classList.remove('hidden');
						input.classList.add('animate-fade-in');
						input.focus();
					}
				}}
			/>
			<Input
				id="search-input"
				type="search"
				placeholder="Search classes..."
				className="pl-10 bg-gray-800 text-white placeholder-gray-400 border-gray-700 hidden animate-fade-out"
			/>
		</form>
	);
}
