import { Play, CheckCircle, Users } from 'lucide-react';

export function FeaturesSection() {
	const features = [
		{
			icon: Play,
			title: 'On-Demand Learning',
			description: 'Access courses anytime, anywhere, at your own pace.',
		},
		{
			icon: CheckCircle,
			title: 'Expert Instructors',
			description: 'Learn from industry professionals and renowned academics.',
		},
		{
			icon: Users,
			title: 'Interactive Community',
			description: 'Engage with peers and instructors in discussion forums.',
		},
	];

	return (
		<section className="py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
					Why Choose EduFlix?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="flex flex-col items-center text-center"
						>
							<feature.icon className="h-12 w-12 text-red-600 mb-4" />
							<h3 className="text-xl font-bold mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
