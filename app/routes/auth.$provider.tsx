import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export async function loader() {
	return redirect('/login');
}

export async function action({ request }: ActionFunctionArgs) {
	try {
		return authenticator.authenticate('google', request, {
			successRedirect: '/play',
			failureRedirect: '/',
		});
	} catch (error) {
		console.error(error);
		return redirect('/');
	}
}
