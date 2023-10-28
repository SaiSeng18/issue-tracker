import prisma from "@/prisma/client";
// import IssueForm from "../../_components/IssueForm";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

interface Props {
	params: {
		id: string;
	};
}

const EditIssuePage = async ({ params }: Props) => {
	// const session = await getServerSession(authOptions);

	// if (!session) {
	// 	redirect("/api/auth/signin");
	// }

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!issue) return null;

	return <IssueForm issue={issue} />;
};
export default EditIssuePage;
