// import IssueForm from "../_components/IssueForm";

import nextDynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

export const dynamic = "force-dynamic";

const IssueForm = nextDynamic(() => import("../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = async () => {
	// const session = await getServerSession(authOptions);

	// if (!session) {
	// 	redirect("/api/auth/signin");
	// }

	return <IssueForm />;
};
export default NewIssuePage;
