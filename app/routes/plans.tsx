import { json } from '@remix-run/node';
import { useLoaderData, useNavigate, Form } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { Button } from '~/components/ui/button';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { AdminHeader } from '~/components/admin/header';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const selectedPlanId = url.searchParams.get('planId');
	const plans = await prisma.plan.findMany();

	return json({ plans, selectedPlanId });
};

export default function Plans() {
	const { plans, selectedPlanId } = useLoaderData<typeof loader>();
	const navigate = useNavigate();

	const handlePlanSelection = (planId: string) => {
		navigate(`/plans?planId=${planId}`);
	};

	return (
		<>
			<AdminHeader />
			<div className="flex flex-col min-h-screen bg-gray-100">
				<main className="flex-1 py-12 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 md:px-6">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
							Available Plans
						</h1>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{plans.map((plan) => (
								<button
									key={plan.id}
									className={`flex flex-col p-6 bg-white rounded-lg shadow-lg cursor-pointer transition-all duration-200 ${
										plan.id.toString() === selectedPlanId
											? 'ring-2 ring-red-600 transform scale-105'
											: 'hover:shadow-xl'
									}`}
									onClick={() => handlePlanSelection(plan.id)}
								>
									<h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
									<p className="text-4xl font-bold mb-6">
										${plan.price}
										<span className="text-sm font-normal">/month</span>
									</p>
									<p className="mb-6 flex-1">{plan.description}</p>
									<Button
										className={`w-full ${
											plan.id.toString() === selectedPlanId
												? 'bg-red-600 hover:bg-red-700'
												: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
										}`}
									>
										{plan.id.toString() === selectedPlanId
											? 'Selected'
											: 'Select Plan'}
									</Button>
								</button>
							))}
						</div>
						<Form method="post" className="mt-12 text-center">
							<input type="hidden" name="planId" value={selectedPlanId || ''} />
							<Button type="submit" className="bg-red-600 hover:bg-red-700">
								Confirm Selection
							</Button>
						</Form>
					</div>
				</main>
			</div>
		</>
	);
}
