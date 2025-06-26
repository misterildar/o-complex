import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/shared/styles/globals.scss';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	weight: ['400'],
});

export const metadata: Metadata = {
	title: 'Ildar',
	description: 'Ildar',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='icon'
					type='image/x-icon'
					href='/favicon.ico'
				/>
			</head>
			<body className={inter.variable}>
				<main>{children}</main>
			</body>
		</html>
	);
}
