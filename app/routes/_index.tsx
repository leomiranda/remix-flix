import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { Header } from '~/components/lp/header';
import { HeroSection } from '~/components/lp/hero-section';
import { CategoriesSection } from '~/components/lp/categories-section';
import { FeaturesSection } from '~/components/lp/features-section';
import { PricingSection } from '~/components/lp/pricing-section';
import { Footer } from '~/components/lp/footer';

export const meta: MetaFunction = () => {
	return [
		{ title: 'EduFlix - Online Learning Platform' },
		{ name: 'description', content: 'Learn from thousands of online courses' },
	];
};

export const loader: LoaderFunction = async () => {
	const plans = await db.plan.findMany();
	return json({ plans });
};

export default function Index() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">
				<HeroSection />
				<CategoriesSection />
				<FeaturesSection />
				<PricingSection />
			</main>
			<Footer />
		</div>
	);
}
