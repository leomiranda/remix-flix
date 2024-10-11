import type { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export const loader = async ({
	request,
	params,
	context,
}: LoaderFunctionArgs) => {
	const { provider } = params;

	return await authenticator.authenticate(provider as string, request, {
		successRedirect: '/play',
		failureRedirect: '/auth/login',
		throwOnError: true,
		context,
	});
};
