import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";

export const metadata: Metadata = {
	title: "Issue Tracker - Dashboard",
	description: "View a summary of project issues",
};

export const dynamic = "force-dynamic";

export default async function Home({
	searchParams,
}: {
	searchParams: { page: string };
}) {
	const open = await prisma.issue.count({ where: { status: "OPEN" } });
	const inProgress = await prisma.issue.count({
		where: { status: "IN_PROGRESS" },
	});
	const closed = await prisma.issue.count({ where: { status: "CLOSE" } });

	const statusData = { open, inProgress, closed };

	return (
		<Grid columns={{ initial: "1", md: "2" }} gap="5">
			<Flex direction="column" gap="5">
				<IssueSummery {...statusData} />
				<IssueChart {...statusData} />
			</Flex>
			<LatestIssues />
		</Grid>
	);
}
