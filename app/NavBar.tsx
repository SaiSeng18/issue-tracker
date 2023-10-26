"use client";

import {
	AlertDialog,
	Avatar,
	Box,
	Button,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { AiFillBug } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

const NavBar = () => {
	const [logout, setLogout] = useState(false);

	return (
		<>
			<nav className="border-b mb-5 px-5 py-3">
				<Container>
					<Flex justify="between">
						<Flex align="center" gap="3">
							<Link href="/">
								<AiFillBug />
							</Link>
							<NavLinks />
						</Flex>

						<AuthStatus setLogout={setLogout} />
					</Flex>
				</Container>
			</nav>

			<LogoutAlert setLogout={setLogout} logout={logout} />
		</>
	);
};

const LogoutAlert = ({
	logout,
	setLogout,
}: {
	logout: boolean;
	setLogout: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<AlertDialog.Root open={logout}>
			<AlertDialog.Content>
				<AlertDialog.Title>Logout</AlertDialog.Title>
				<AlertDialog.Description>
					Are you sure you want to logout?
				</AlertDialog.Description>
				<Flex gap="3" mt="3">
					<Button variant="soft" color="gray" onClick={() => setLogout(false)}>
						Cancel
					</Button>

					<AlertDialog.Action>
						<Button variant="solid" color="red" onClick={() => signOut()}>
							Logout
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};

const NavLinks = () => {
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" },
	];

	const currentPath = usePathname();

	return (
		<ul className="flex space-x-6">
			{links.map((link) => (
				<li key={link.href}>
					<Link
						href={link.href}
						className={classnames({
							"text-zinc-900": link.href === currentPath,
							"text-zinc-500": link.href !== currentPath,
							"hover:text-zinc-800 transition-colors": true,
						})}>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = ({
	setLogout,
}: {
	setLogout: Dispatch<SetStateAction<boolean>>;
}) => {
	const { status, data: session } = useSession();

	if (status === "loading") return <Skeleton width="4rem" height="1.75rem" />;

	if (status === "unauthenticated")
		return <Button onClick={() => signIn()}>Login</Button>;

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session?.user?.image!}
						fallback="?"
						className="cursor-pointer"
						referrerPolicy="no-referrer"
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size="3" weight="bold" color="violet">
							Sign In as
						</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Label>
						<Text size="2">{session?.user?.email}</Text>
					</DropdownMenu.Label>

					<DropdownMenu.Separator />

					<DropdownMenu.Item>
						<button
							onClick={() => setLogout(true)}
							className="cursor-pointer w-full text-left h-full">
							Logout
						</button>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default NavBar;
