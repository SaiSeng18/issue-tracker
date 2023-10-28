import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import "highlight.js/styles/github.css";
import ReactMarkDown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

const IssueDetails = ({ issue }: { issue: Issue }) => {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex gap="3" my="2">
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose max-w-full" mt="4">
				<ReactMarkDown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
					{issue.description}
				</ReactMarkDown>
			</Card>
		</>
	);
};
export default IssueDetails;
