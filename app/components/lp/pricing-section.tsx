import { Button } from '~/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function PricingSection() {
	const plans = [
		{
			name: 'Basic',
			price: '$8.99',
			features: ['Access to 1000+ courses', 'Mobile access', '1 device'],
		},
		{
			name: 'Standard',
			price: '$12.99',
			features: [
				'Access to 5000+ courses',
				'Mobile access',
				'2 devices',
				'Offline viewing',
			],
		},
		{
			name: 'Premium',
			price: '$15.99',
			features: [
				'Access to all courses',
				'Mobile access',
				'4 devices',
				'Offline viewing',
				'Certification prep',
			],
		},
	];

	return (
		<section className="py-12 md:py-24 lg:py-32 bg-gray-100">
			<div className="container mx-auto px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
					Choose Your Plan
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className="flex flex-col p-6 bg-white rounded-lg shadow-lg"
						>
							<h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
							<p className="text-4xl font-bold mb-6">
								{plan.price}
								<span className="text-sm font-normal">/month</span>
							</p>
							<ul className="mb-6 flex-1">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-center mb-2">
										<CheckCircle className="h-5 w-5 text-green-500 mr-2" />
										{feature}
									</li>
								))}
							</ul>
							<Button className="w-full bg-red-600 hover:bg-red-700">
								Choose Plan
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
