// import { useState } from 'react';
import { Button } from '~/components/ui/button';
// import { CheckCircle } from 'lucide-react';
import { useFetcher, useNavigate, useRouteLoaderData } from '@remix-run/react';

interface Plan {
	id: string;
	name: string;
	price: number;
	description: string;
}

export function PricingSection() {
	// const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const { plans } = useRouteLoaderData('routes/_index') as { plans: Plan[] };

	const handlePlanSelection = (plan: Plan) => {
		// setSelectedPlan(plan);
		// fetcher.submit(
		// 	{ planId: plan.id },
		// 	{ method: 'post', action: '/api/create-payment' }
		// );
		navigate(`/plans?planId=${plan.id}`);
	};

	return (
		<section className="py-12 md:py-24 lg:py-32 bg-gray-100">
			<div className="container mx-auto px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
					Choose Your Plan
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className="flex flex-col p-6 bg-white rounded-lg shadow-lg"
						>
							<h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
							<p className="text-4xl font-bold mb-6">
								{plan.price}
								<span className="text-sm font-normal">/month</span>
							</p>
							<p className="mb-6 flex-1">{plan.description}</p>
							<Button
								className="w-full bg-red-600 hover:bg-red-700"
								onClick={() => handlePlanSelection(plan)}
								disabled={fetcher.state === 'submitting'}
							>
								{fetcher.state === 'submitting'
									? 'Processing...'
									: 'Choose Plan'}
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
