import {
	json,
	LoaderFunctionArgs,
	redirect,
	type ActionFunctionArgs,
} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { authenticator, signup } from '~/utils/auth.server';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { ErrorList, Field } from '~/components/Forms';

const SignupFormSchema = z
	.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters'),
		name: z.string().min(3, 'Name must be at least 3 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const loader = async ({ request }: LoaderFunctionArgs) => {
	await authenticator.isAuthenticated(request, {
		successRedirect: '/play',
	});
	return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();

	const submission = await parseWithZod(formData, {
		schema: (intent) =>
			SignupFormSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null };

				const session = await signup(data);
				if (!session) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Failed to create account',
					});
					return z.NEVER;
				}

				return { ...data, session };
			}),
		async: true,
	});

	if (submission.status !== 'success' || !submission.value.session) {
		return json(
			{
				result: submission.reply({
					hideFields: ['password', 'confirmPassword'],
				}),
			},
			{ status: submission.status === 'error' ? 400 : 200 }
		);
	}

	return redirect('/auth/login');
};

export default function Signup() {
	const actionData = useActionData<typeof action>();
	const [form, fields] = useForm({
		id: 'signup-form',
		constraint: getZodConstraint(SignupFormSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: SignupFormSchema });
		},
		shouldRevalidate: 'onBlur',
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
				<h2 className="text-center text-3xl font-extrabold text-gray-900">
					Create your account
				</h2>
				<Form {...getFormProps(form)} method="post" className="mt-8 space-y-6">
					<div className="space-y-4 rounded-md shadow-sm">
						<Field
							labelProps={{ children: 'Email' }}
							inputProps={{
								...getInputProps(fields.email, { type: 'email' }),
								autoFocus: true,
								className: 'lowercase',
								autoComplete: 'email',
							}}
							errors={fields.email.errors}
						/>
						<Field
							labelProps={{ children: 'Name' }}
							inputProps={{
								...getInputProps(fields.name, { type: 'text' }),
								autoComplete: 'name',
							}}
							errors={fields.name.errors}
						/>
						<Field
							labelProps={{ children: 'Password' }}
							inputProps={{
								...getInputProps(fields.password, { type: 'password' }),
								autoComplete: 'new-password',
							}}
							errors={fields.password.errors}
						/>
						<Field
							labelProps={{ children: 'Confirm Password' }}
							inputProps={{
								...getInputProps(fields.confirmPassword, { type: 'password' }),
								autoComplete: 'new-password',
							}}
							errors={fields.confirmPassword.errors}
						/>
					</div>

					<ErrorList errors={form.errors} id={form.errorId} />

					<div>
						<Button type="submit" className="w-full">
							Sign up
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
				<div className="mt-6 text-center">
					<span className="text-sm text-gray-600">
						Already have an account?{' '}
						<a
							href="/auth/login"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Sign in
						</a>
					</span>
				</div>
			</div>
		</div>
	);
}
