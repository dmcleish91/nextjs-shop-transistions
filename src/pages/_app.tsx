import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<AnimatePresence mode='wait'>
			<Head>
				<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'></meta>
			</Head>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { duration: 0.2 } }}
				key={router.route}>
				<Component {...pageProps} />
			</motion.div>
		</AnimatePresence>
	);
}
