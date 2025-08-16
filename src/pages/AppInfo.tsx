import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import MinNavbar from "../components/MinNavbar";
import { IoIosArrowForward } from "react-icons/io";

const AppInfo = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const hash = location.hash.replace("#", "");

	useEffect(() => {
		if (hash) {
			const element = document.getElementById(hash);
			if (element) {
				element.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		}
	}, [hash]);

	const handleNavigate = (section: string) => {
		navigate(`/info#${section}`, { replace: true });
	};

	return (
		<div className="h-screen w-screen px-4 bg-background-primary flex flex-col justify-start items-center">
			<MinNavbar />
			<div className="w-full h-lvh p-4 flex flex-col-reverse lg:flex-row justify-evenly items-start gap-4 overflow-hidden">
				<div className="w-full lg:w-3/4 h-full flex flex-col justify-start items-start gap-8 overflow-auto custom-scrollbar">
					<section
						id="about"
						className="flex flex-col justify-start items-start gap-2"
					>
						<h1 className="text-2xl font-bold text-text-primary">
							About
						</h1>
						<p className="text-sm text-text-primary pl-4">
							Trellix is a modern project management app designed
							to help teams collaborate efficiently and get work
							done. Inspired by the Kanban methodology, Trellix
							provides a simple yet powerful workspace where you
							can organize tasks, manage projects, and track
							progress, all in one place.
						</p>
					</section>
					<section
						id="terms-of-use"
						className="flex flex-col justify-start items-start gap-2"
					>
						<h1 className="text-2xl font-bold text-text-primary">
							Terms of Use
						</h1>
						<div className="flex flex-col justify-start items-start gap-2 pl-4">
							<p className="text-sm text-text-primary font-bold">
								Effective Date: [Date]
							</p>
							<p className="text-sm text-text-primary">
								Welcome to Trellix – a project management
								application designed to help you organize tasks,
								teams, and projects.
								<br /> By using Trellix, you agree to the
								following Terms of Use. If you do not agree,
								please do not use this App.
							</p>
							<ol className="flex flex-col list-decimal list-inside gap-2">
								<li className="text-md text-text-primary font-bold">
									Acceptance of Terms
									<p className="text-sm text-text-primary font-normal pl-4">
										By using Trellix, you acknowledge that
										you have read, understand, and agree to
										these Terms of Use. If you do not agree
										to these Terms of Use, please do not use
										this App.
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Use of the App
									<ul className="list-disc list-inside pl-4">
										<li className="text-sm text-text-primary font-normal">
											You may use Trellix for personal use
											and not for commercial purposes.
										</li>
										<li className="text-sm text-text-primary font-normal">
											You agree not to misuse, disrupt, or
											reverse-engineer any part of the
											App.
										</li>
										<li className="text-sm text-text-primary font-normal">
											You are responsible for any activity
											under your account.
										</li>
									</ul>
								</li>
								<li className="text-md text-text-primary font-bold">
									User Content
									<ul className="list-disc list-inside pl-4">
										<li className="text-sm text-text-primary font-normal">
											You retain ownership of any content
											you add (tasks, notes, files).
										</li>
										<li className="text-sm text-text-primary font-normal">
											You grant Trellix a limited license
											to store and display this content
											for the purpose of operating the
											App.
										</li>
									</ul>
								</li>
								<li className="text-md text-text-primary font-bold">
									Changes to the App
									<p className="text-sm text-text-primary font-normal pl-4">
										Trellix may be updated or modified at
										any time without notice. Features may be
										added or removed.
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Disclaimer
									<p className="text-sm text-text-primary font-normal pl-4">
										The App is provided “as is” without
										warranties of any kind. We do not
										guarantee that it will be error-free or
										always available.
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Limitation of Liability
									<p className="text-sm text-text-primary font-normal pl-4">
										To the extent permitted by law, Trellix
										and its developer shall not be liable
										for any indirect or consequential
										damages arising from the use of this
										App.
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Termination
									<p className="text-sm text-text-primary font-normal pl-4">
										We reserve the right to suspend or
										terminate access to the App if you
										violate these terms or misuse the
										service.
									</p>
								</li>
							</ol>
						</div>
					</section>
					<section
						id="privacy-policy"
						className="flex flex-col justify-start items-start gap-2"
					>
						<h1 className="text-2xl font-bold text-text-primary">
							Privacy Policy
						</h1>
						<div className="flex flex-col justify-start items-start gap-2 pl-4">
							<p className="text-sm text-text-primary font-bold">
								Effective Date: [Date]
							</p>
							<p className="text-sm text-text-primary">
								This Privacy Policy explains how Trellix
								collects, uses, and protects your information.
							</p>
							<ol className="flex flex-col list-decimal list-inside gap-2">
								<li className="text-md text-text-primary font-bold">
									Information We Collect
									<p className="text-sm text-text-primary font-normal pl-4">
										We may collect the following:
									</p>
									<ul className="list-disc list-inside pl-4">
										<li className="text-sm text-text-primary font-normal">
											Your name or email (if login is
											used)
										</li>
										<li className="text-sm text-text-primary font-normal">
											Project, task, and note content
										</li>
										<li className="text-sm text-text-primary font-normal">
											Basic usage analytics (optional)
										</li>
									</ul>
								</li>
								<li className="text-md text-text-primary font-bold">
									How We Use Your Information
									<p className="text-sm text-text-primary font-normal pl-4">
										We use your data to:
									</p>
									<ul className="list-disc list-inside pl-4">
										<li className="text-sm text-text-primary font-normal">
											Provide and improve the App
										</li>
										<li className="text-sm text-text-primary font-normal">
											Respond to feedback or support
											requests
										</li>
										<li className="text-sm text-text-primary font-normal">
											Analyze usage trends (if enabled)
										</li>
									</ul>
								</li>
								<li className="text-md text-text-primary font-bold">
									Data Storage
									<p className="text-sm text-text-primary font-normal pl-4">
										All data is stored securely. But we are
										not guaranteed to keep your data safe.
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Third-Party Services
									<p className="text-sm text-text-primary font-normal pl-4">
										We do not sell or share your data with
										third parties. If the App uses any
										third-party services (e.g. cloud
										storage, analytics), it will be listed
										here with links to their policies.
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Cookies
									<p className="text-sm text-text-primary font-normal pl-4">
										If Trellix is web-based, cookies may be
										used to maintain session state or
										remember preferences. You can block
										cookies via browser settings.
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Your Rights
									<p className="text-sm text-text-primary font-normal pl-4">
										You can request data deletion at any
										time by contacting us at [Your Email].
									</p>
								</li>
								<li className="text-md text-text-primary font-bold">
									Changes to This Policy
									<p className="text-sm text-text-primary font-normal pl-4">
										We may update this policy. Changes will
										be reflected with a new effective date.
									</p>
								</li>
							</ol>
						</div>
					</section>
				</div>
				<div className="sticky lg:p-4 flex lg:flex-col justify-start items-center lg:items-start gap-2 lg:border-l border-text-secondary">
					<IoIosArrowForward className="w-4 h-4 text-text-primary lg:hidden" />
					<a
						href="#about"
						onClick={() => handleNavigate("about")}
						className="text-text-primary text-sm font-medium hover:underline underline lg:no-underline"
					>
						About
					</a>
					<a
						href="#terms-of-use"
						onClick={() => handleNavigate("terms-of-use")}
						className="text-text-primary text-sm font-medium hover:underline underline lg:no-underline"
					>
						Terms of Use
					</a>
					<a
						href="#privacy-policy"
						onClick={() => handleNavigate("privacy-policy")}
						className="text-text-primary text-sm font-medium hover:underline underline lg:no-underline"
					>
						Privacy Policy
					</a>
				</div>
			</div>
		</div>
	);
};

export default AppInfo;
