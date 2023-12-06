'use client';
import { getAuth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/routes';

const auth = getAuth();

export const UserContext = createContext<{ user: User | null }>({ user: null });

function UserProvider({ children }: React.HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	const refreshToken = useCallback(async (user: User | null) => {
		const newToken = await user?.getIdToken(true);
		if (newToken) {
			const response = await fetch(API.AUTH_REFRESH, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${newToken}`,
				},
			});
			if (response.status !== 200) {
				router.refresh();
			}
		}
	}, [router]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (!user) return;
		refreshToken(user);
		const handle = setInterval(
			async () => {
				refreshToken(user);
			},
			10 * 60 * 1000,
		);

		// clean up setInterval
		return () => clearInterval(handle);
	}, [user, refreshToken]);

	return (
		<UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
	);
}

export default UserProvider;
