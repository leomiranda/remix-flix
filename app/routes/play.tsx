import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
	await authenticator.isAuthenticated(request, {
		failureRedirect: '/',
	});

	return {};
}

export default function Play() {
	return <div>Play</div>;
}
