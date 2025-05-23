// app/services/session.server.ts
import { createCookieSessionStorage } from '@remix-run/node';

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'session', // use any name you want here
		sameSite: 'lax', // this helps with CSRF
		path: '/', // remember to add this so the cookie will work in all routes
		httpOnly: true, // for security reasons, make this cookie http only
		secrets: [process.env.SESSION_SECRET as string], // Use SESSION_SECRET from environment variables
		secure: process.env.NODE_ENV === 'production', // enable this in prod only
	},
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
