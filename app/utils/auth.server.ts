import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import type { User } from '@prisma/client';
import { db } from './db.server';
import { GoogleStrategy } from 'remix-auth-google';
import { FormStrategy } from 'remix-auth-form';
import bcrypt from 'bcryptjs';

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
		let user = await db.user.findUnique({ where: { email } });

		if (!user) {
			user = await db.user.create({
				data: {
					email,
					imageUrl: profile.photos[0].value,
					username: profile.displayName,
				},
			});

			if (!user) throw new Error('Unable to create the user');
		}

		return user;
	}
);

// Form Strategy
const formStrategy = new FormStrategy(async ({ form }) => {
	const email = form.get('email') as string;
	const password = form.get('password') as string;

	let user = await db.user.findUnique({ where: { email } });

	if (!user) {
		// Create a new user if one doesn't exist
		const hashedPassword = await bcrypt.hash(password, 10);
		user = await db.user.create({
			data: {
				email,
				password: hashedPassword,
				username: email, // Use part of email as username
				imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
					email
				)}`,
			},
		});

		if (!user) throw new Error('Unable to create the user');
	} else {
		// Verify password for existing user
		const isPasswordValid =
			user.password && (await bcrypt.compare(password, user.password));

		if (!isPasswordValid) {
			throw new Error('Invalid credentials');
		}
	}

	console.log('🚀 ~ formStrategy ~ user:', user);

	return user;
});

authenticator.use(googleStrategy, 'google');
authenticator.use(formStrategy, 'form');
