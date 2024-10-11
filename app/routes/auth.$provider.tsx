import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export async function loader() {
	return redirect('/auth/login');
}

export async function action({ request, context, params }: ActionFunctionArgs) {
	const { provider } = params;

	return await authenticator.authenticate(provider as string, request, {
		successRedirect: '/dashboard',
		failureRedirect: '/auth/login',
		throwOnError: true,
		context,
	});
}
