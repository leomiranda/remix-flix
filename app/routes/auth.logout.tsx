import type { LoaderFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/utils/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return authenticator.logout(request, { redirectTo: '/' });
};
