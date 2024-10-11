import { Link } from '@remix-run/react';
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
						<Link to="/auth/login" className="ml-4">
							<Button
								className="w-full bg-white text-black hover:bg-gray-200"
								size="lg"
							>
								<svg
									className="w-6 h-6 mr-2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
										fill="currentColor"
									/>
								</svg>
								Sign in with Google
							</Button>
						</Link>
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
