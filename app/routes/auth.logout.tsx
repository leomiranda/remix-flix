import { redirect, type ActionFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/utils/auth.server';

export async function loader() {
	return redirect('/');
}

export const action = async ({ request }: ActionFunctionArgs) => {
	return authenticator.logout(request, { redirectTo: '/' });
};
