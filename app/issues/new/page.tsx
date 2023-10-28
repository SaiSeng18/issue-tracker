// import IssueForm from "../_components/IssueForm";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
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
