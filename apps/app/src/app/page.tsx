import { TiWaves } from 'react-icons/ti';
import Link from 'next/link';
import { SIGN_UP, SIGN_IN, AUTH } from '@/constants/routes';

function Home() {
	return (
		<main>
			<section className='flex justify-center'>
				<div>
					<span className='text-gray-800 dark:text-white flex justify-center mx-auto'>
						<TiWaves size={52} />
					</span>
					<p>NexWave application</p>

					<div className='space-x-4 text-xl'>
						<Link
							href={SIGN_UP}
							className='text-blue-500 dark:text-blue-400 hover:underline'
						>
							Sign up
						</Link>
						<span className='text-lg'>/</span>
						<Link
							href={SIGN_IN}
							className='text-blue-500 dark:text-blue-400 hover:underline'
						>
							Sign in
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
export default Home;
