'use server';
// import { signIn as firebaseSignIn } from '@/lib/firebase-admin.server';
import { signInWithEmailAndPassword } from '@/lib/firebase';

export async function signIn(formData: FormData) {
	const result = await signInWithEmailAndPassword({
		email: formData.get('email')?.toString(),
		password: formData.get('password')?.toString(),
	});
}
