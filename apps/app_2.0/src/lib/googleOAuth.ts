import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client({
	clientId: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_ID,
	clientSecret: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET,
});

export default client;
