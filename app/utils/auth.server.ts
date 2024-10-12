import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import type { User } from '@prisma/client';
import { prisma } from './db.server';
import { GoogleStrategy } from 'remix-auth-google';
import { FormStrategy } from 'remix-auth-form';
import bcrypt from 'bcryptjs';

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
export const getSessionExpirationDate = () =>
	new Date(Date.now() + SESSION_EXPIRATION_TIME);

export const authenticator = new Authenticator<User>(sessionStorage, {
	throwOnError: true,
});

// Google Strategy
const googleStrategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID as string,
		clientSecret: process.env.GOOGLE_SECRET_KEY as string,
		callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
	},
	async ({ profile }) => {
		const email = profile.emails[0].value;
		let user = await prisma.user.findUnique({ where: { email } });
		console.log('🚀 ~ user:', user);

		if (!user) {
			user = await prisma.user.create({
				data: {
					email,
					imageUrl: profile.photos[0].value,
					name: profile.displayName,
				},
			});

			if (!user) throw new Error('Unable to create the user');
		}

		await createSession(user.id);

		return user;
	}
);

// Form Strategy
const formStrategy = new FormStrategy(async ({ form }) => {
	const email = form.get('email') as string;
	const password = form.get('password') as string;
	const user = await verifyUserPassword(email, password);

	// if (!user) {
	// 	// Create a new user if one doesn't exist
	// 	const hashedPassword = await bcrypt.hash(password, 10);
	// 	user = await prisma.user.create({
	// 		data: {
	// 			email,
	// 			password: hashedPassword,
	// 			name: email, // Use part of email as name
	// 			imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
	// 				email
	// 			)}`,
	// 		},
	// 	});

	if (!user) throw new Error('Invalid credentials');
	return user;
});

authenticator.use(googleStrategy, 'google');
authenticator.use(formStrategy, 'form');

export async function signup({
	email,
	password,
	name,
}: {
	email: User['email'];
	password: string;
	name: string;
}) {
	const user = await verifyUserPassword(email, password);
	if (user) throw new Error('User already exists');

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
			imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
		},
	});

	if (!newUser) throw new Error('Unable to create the user');

	return newUser;
}

export async function login({
	email,
	password,
}: {
	email: User['email'];
	password: string;
}) {
	const user = await verifyUserPassword(email, password);
	if (!user) return null;

	await createSession(user.id);
	return user;
}

export async function verifyUserPassword(
	email: User['email'],
	password: string
) {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) return null;

	const isPasswordValid =
		user.password && (await bcrypt.compare(password, user.password));

	if (!isPasswordValid) return null;

	return user;
}

export async function createSession(userId: string) {
	const session = await prisma.session.create({
		data: { expirationDate: getSessionExpirationDate(), userId },
	});
	return session;
}
