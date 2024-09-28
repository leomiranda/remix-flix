import { Button } from '~/components/ui/button';

export function HeroSection() {
	return (
		<section className="py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							Unlimited Learning, Anytime, Anywhere
						</h1>
						<p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
							Stream thousands of expert-led courses on any device. Expand your
							knowledge and skills with EduFlix.
						</p>
					</div>
					<div className="w-full max-w-sm space-y-2">
						<Button
							className="w-full bg-white text-black hover:bg-gray-200"
							size="lg"
						>
							{/* Google SVG icon */}
							Sign in with Google
						</Button>
						<p className="text-xs text-gray-400">
							By signing in, you agree to our Terms of Service and Privacy
							Policy.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
