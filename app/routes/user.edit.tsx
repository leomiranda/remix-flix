import {
	json,
	LoaderFunctionArgs,
	type ActionFunctionArgs,
	redirect,
} from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { authenticator, updateUser } from '~/utils/auth.server';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { ErrorList, Field } from '~/components/Forms';
import { sessionStorage } from '~/utils/session.server';
import { AdminHeader } from '~/components/admin/header';

const UserEditFormSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	email: z.string().email('Invalid email address'),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/auth/login',
	});
	return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/auth/login',
	});
	const formData = await request.formData();

	const submission = await parseWithZod(formData, {
		schema: UserEditFormSchema.transform(async (data, ctx) => {
			const updatedUser = await updateUser(user.id, data);
			if (!updatedUser) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Failed to update user',
				});
				return z.NEVER;
			}
			return updatedUser;
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return json({ result: submission.reply() }, { status: 400 });
	}

	// Update the session with the new user data
	const session = await sessionStorage.getSession(
		request.headers.get('Cookie')
	);
	session.set(authenticator.sessionKey, submission.value);

	// Redirect to the same page with updated session
	return redirect('/user/edit', {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	});
};

export default function UserEdit() {
	const { user } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const [form, fields] = useForm({
		id: 'user-edit-form',
		constraint: getZodConstraint(UserEditFormSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserEditFormSchema });
		},
		shouldRevalidate: 'onBlur',
		defaultValue: {
			name: user.name,
			email: user.email,
		},
	});

	return (
		<>
			<AdminHeader />
			<div className="flex min-h-screen items-center justify-center bg-gray-100">
				<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
					<h2 className="text-center text-3xl font-extrabold text-gray-900">
						Edit Your Profile
					</h2>
					<Form
						{...getFormProps(form)}
						method="post"
						className="mt-8 space-y-6"
					>
						<div className="space-y-4 rounded-md shadow-sm">
							<Field
								labelProps={{ children: 'Name' }}
								inputProps={{
									...getInputProps(fields.name, { type: 'text' }),
									autoFocus: true,
									autoComplete: 'name',
								}}
								errors={fields.name.errors}
							/>
							<Field
								labelProps={{ children: 'Email' }}
								inputProps={{
									...getInputProps(fields.email, { type: 'email' }),
									className: 'lowercase',
									autoComplete: 'email',
								}}
								errors={fields.email.errors}
							/>
						</div>

						<ErrorList errors={form.errors} id={form.errorId} />

						<div>
							<Button type="submit" className="w-full">
								Update Profile
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
}
