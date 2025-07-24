import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import MinNavbar from "../components/MinNavbar";

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
					block: "center",
				});
			}
		}
	}, [hash]);

	const handleNavigate = (section: string) => {
		navigate(`/info#${section}`, { replace: true });
	};

	return (
		<div className="flex min-h-screen flex-col bg-background-primary">
			<MinNavbar />
			<div className="flex flex-col-reverse md:flex-row justify-evenly items-start p-8 gap-4">
				<div className="flex-1 max-w-4xl flex flex-col overflow-y-auto gap-8 justify-center">
					<section
						id="about"
						className="flex flex-col justify-start items-start gap-2"
					>
						<h1 className="text-2xl font-bold text-text-primary">
							About
						</h1>
						<p className="text-sm text-text-primary pl-4">
							Trellix is a modern, React-powered project
							management app inspired by Kanban, built for teams
							to organize tasks, collaborate, and stay productive.
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
					</section>
				</div>
				<div className="w-auto flex flex-col justify-start items-start border-l-1 border-text-secondary p-4 sticky md:top-22 md;right-0">
					<a
						href="#about"
						onClick={() => handleNavigate("about")}
						className="text-text-primary text-sm font-medium hover:underline"
					>
						About
					</a>
					<a
						href="#terms-of-use"
						onClick={() => handleNavigate("terms-of-use")}
						className="text-text-primary text-sm font-medium hover:underline"
					>
						Terms of Use
					</a>
					<a
						href="#privacy-policy"
						onClick={() => handleNavigate("privacy-policy")}
						className="text-text-primary text-sm font-medium hover:underline"
					>
						Privacy Policy
					</a>
				</div>
			</div>
		</div>
	);
};

export default AppInfo;
