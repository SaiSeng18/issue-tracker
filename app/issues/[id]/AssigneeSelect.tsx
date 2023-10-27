"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, error, isLoading } = useUser();

	if (isLoading) return <Skeleton height="2rem" />;

	if (error) return null;

	// Fetching with normal useState and useEffect hooks
	// const [users, setUsers] = useState<User[]>([]);

	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		const { data } = await axios.get<User[]>("/api/users");
	// 		setUsers(data);
	// 	};

	// 	fetchUser();
	// }, []);

	const assignIssue = async (userId: string) => {
		try {
			await axios.patch("/api/issues/" + issue.id, {
				assignedToUserId: userId === "unassigned" ? null : userId,
			});
		} catch (error) {
			toast.error("Changes could not be made.");
		}
	};

	return (
		<>
			<Select.Root
				defaultValue={issue.assignedToUserId || "unassigned"}
				onValueChange={assignIssue}>
				<Select.Trigger placeholder="Assign..." />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value="unassigned">Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item value={user.id} key={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

const useUser = () =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		staleTime: 60 * 1000,
		retry: 3,
	});

export default AssigneeSelect;
