import {
	json,
	LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { authenticator } from '~/utils/auth.server';

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
	await authenticator.isAuthenticated(request, {
		successRedirect: '/play',
	});
	return null;
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
	const clonedRequest = request.clone();
	const formData = await clonedRequest.formData();
	const result = loginSchema.safeParse(Object.fromEntries(formData));

	if (!result.success) {
		return json(
			{ errors: result.error.flatten().fieldErrors },
			{ status: 400 }
		);
	}

	return await authenticator.authenticate('form', request, {
		successRedirect: '/play',
		failureRedirect: '/auth/login',
		throwOnError: true,
		context,
	});
};

export default function Login() {
	const actionData = useActionData<typeof action>();

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
				<h2 className="text-center text-3xl font-extrabold text-gray-900">
					Sign in to your account
				</h2>
				<Form method="post" className="mt-8 space-y-6">
					<div className="space-y-4 rounded-md shadow-sm">
						<div>
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="mt-1"
							/>
							{actionData?.errors && 'email' in actionData.errors && (
								<p className="mt-1 text-sm text-red-600">
									{actionData.errors.email}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="mt-1"
							/>
							{actionData?.errors && 'password' in actionData.errors && (
								<p className="mt-1 text-sm text-red-600">
									{actionData.errors.password}
								</p>
							)}
						</div>
					</div>

					{actionData?.errors && 'form' in actionData.errors && (
						<div className="rounded-md bg-red-50 p-4">
							<p className="text-sm text-red-700">{actionData.errors.form}</p>
						</div>
					)}

					<div>
						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</div>
				</Form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="mt-6">
						<div className="inline-flex w-full justify-center">
							<Form action="/auth/google" method="post">
								<Button variant="outline" className="w-full">
									<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
										/>
									</svg>
									Sign in with Google
								</Button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
