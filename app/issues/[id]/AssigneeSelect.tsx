"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const AssigneeSelect = () => {
	const {
		data: users,
		error,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		staleTime: 60 * 1000,
		retry: 3,
	});

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

	return (
		<Select.Root>
			<Select.Trigger placeholder="Assign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{users?.map((user) => (
						<Select.Item value={user.id} key={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;
