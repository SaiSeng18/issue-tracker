import { Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const LoadingIssueDetailPage = () => {
	return (
		<div>
			<Skeleton className="max-w-xl" />

			<Flex gap="3" my="2">
				<Skeleton width="3rem" />
				<Skeleton width="8rem" />
			</Flex>
			<Card className="prose" mt="4">
				<Skeleton width="8rem" count={3} />
			</Card>
		</div>
	);
};
export default LoadingIssueDetailPage;
