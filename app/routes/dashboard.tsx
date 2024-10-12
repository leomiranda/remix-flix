import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { authenticator } from '~/utils/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/auth/login',
	});
	return json({ user });
};

export default function Dashboard() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
			<p>Welcome, {user.name}!</p>
			<p>Your user ID is: {user.id}</p>
			<p>Your email is: {user.email}</p>
		</div>
	);
}
