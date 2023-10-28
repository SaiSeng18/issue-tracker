import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Issue Tracker - Issues",
	description: "View all issues",
};

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
	const statuses = Object.values(Status);

	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const where = { status };

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined;

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await prisma.issue.count({ where });

	return (
		<div>
			<IssueActions />
			<IssueTable issues={issues} searchParams={searchParams} />
			<Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
		</div>
	);
};
export default IssuesPage;
