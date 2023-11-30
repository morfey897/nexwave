export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<section>
				<div className='container flex items-center justify-center min-h-screen px-6 mx-auto'>
					{children}
				</div>
			</section>
		</main>
	);
}
