import type { MetaFunction } from '@remix-run/node';
import { Header } from '~/components/lp/header';
import { HeroSection } from '~/components/lp/hero-section';
import { CategoriesSection } from '~/components/lp/categories-section';
import { FeaturesSection } from '~/components/lp/features-section';
import { PricingSection } from '~/components/lp/pricing-section';
import { Footer } from '~/components/lp/footer';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
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
