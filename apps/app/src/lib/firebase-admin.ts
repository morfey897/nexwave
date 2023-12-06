import admin, { AppOptions } from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';

const firebaseConfig: AppOptions = {
	credential: admin.credential.cert(
		JSON.parse(process.env.NEXT_PRIVATE_FIREBASE_CREDENTIALS || '{}'),
	),
};
export function getApp() {
	return admin.apps[0] || admin.initializeApp(firebaseConfig);
}

export function getAuth() {
	return admin.auth(getApp());
}

export async function signIn({
	username,
	password,
}: {
	username?: string;
	password?: string;
}) {
	const auth = getAuth();

	// admin.auth().verify

	username = (username || '').trim();
	let user: UserRecord | null = null;

	const isEmail = username.includes('@');
	if (isEmail) {
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				username,
			)
		) {
			throw new Error('Invalid email address');
		}
		try {
			user = await auth.getUserByEmail(username);
		} catch (e) {
			// ignore
		}
	} else {
		const phone = username.replace(/\D/g, '');
		if (!phone) {
			throw new Error('Invalid phone number');
		}
		try {
			user = await auth.getUserByPhoneNumber(username);
		} catch (e) {
			// ignore
		}
	}

	if (user) {
		console.log('User', user);
		// await auth.deleteUser(user.uid);
	} else {
		if (!password) {
			throw new Error('Password is required');
		}
		if (isEmail) {
			console.log('Email', { username, password });
			// const hash = await scrypt.hash(password, SALT);
			// console.log('Hash', hash);
			user = await auth.createUser({
				email: username,
				emailVerified: true,
				password: password,
				disabled: false,
			});
			// const link = await auth.generateEmailVerificationLink(username);

			console.log('createUser', user);

			// const userRecord = await auth.listUsers();
			// console.log('getUser', userRecord);
		} else {
			user = await auth.createUser({
				phoneNumber: username,
				password: password,
				disabled: false,
			});
		}
	}

	return user;
}
