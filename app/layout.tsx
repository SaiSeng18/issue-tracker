import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import NavBar from "./NavBar";
import "./globals.css";
import "./theme-config.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<Theme appearance="light" accentColor="iris">
					<NavBar />
					<main className="p-5">
						<Container>{children}</Container>
					</main>
					{/* <ThemePanel /> */}
				</Theme>
			</body>
		</html>
	);
}
