"use client";

import { ResponsiveBar } from "@nivo/bar";
import { Card } from "@radix-ui/themes";

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
	const data = [
		{ label: "Open", value: open, color: "#ffebee" },
		{ label: "In Progress", value: inProgress, color: "#f4f0fe" },
		{ label: "Closed", value: closed, color: "#e6f6ec" },
	];

	return (
		<Card>
			{/* <ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="label" interval={0} />
					<YAxis />
					<Bar dataKey="value" maxBarSize={60} style={{ fill: "var(--accent-9)" }} />
				</BarChart>
			</ResponsiveContainer> */}

			<div className="h-[300px]">
				<ResponsiveBar
					data={data}
					keys={["value"]}
					indexBy="label"
					margin={{ right: 110, left: 20, top: 20, bottom: 20 }}
					padding={0.3}
					valueScale={{ type: "linear" }}
					indexScale={{ type: "band", round: true }}
					colors={data.map((item) => item.color)}
					colorBy="indexValue"
					borderRadius={5}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{
						from: "color",
						modifiers: [["darker", 1.6]],
					}}
					axisBottom={null}
					legends={[
						{
							dataFrom: "indexes",
							anchor: "bottom-right",
							direction: "column",
							justify: false,
							translateX: 120,
							translateY: 0,
							itemsSpacing: 2,
							itemWidth: 100,
							itemHeight: 20,
							itemDirection: "left-to-right",
							itemOpacity: 0.85,
							symbolSize: 20,
							effects: [
								{
									on: "hover",
									style: {
										itemOpacity: 1,
									},
								},
							],
						},
					]}
					layout="vertical"
					animate={true}
					motionConfig="slow"
					role="application"
					ariaLabel="Issue CHart"
				/>
			</div>
		</Card>
	);
};
export default IssueChart;
