import { ChevronDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useState } from "react";

const weeklyChartData = [
  { day: "Monday", sales: 186 },
  { day: "Tuesday", sales: 305 },
  { day: "Wednesday", sales: 237 },
  { day: "Thursday", sales: 73 },
  { day: "Friday", sales: 209 },
  { day: "Saturday", sales: 214 },
  { day: "Sunday", sales: 142 },
];

const monthlyChartData = [
  { month: "January", sales: 186 },
  { month: "Feburary", sales: 305 },
  { month: "March", sales: 237 },
  { month: "April", sales: 73 },
  { month: "May", sales: 209 },
  { month: "June", sales: 214 },
  { month: "July", sales: 152 },
  { month: "August", sales: 112 },
  { month: "September", sales: 192 },
  { month: "October", sales: 82 },
  { month: "November", sales: 252 },
  { month: "December", sales: 162 },
];

const yearlyChartData = [
  { year: "2000", sales: 186 },
  { year: "2001", sales: 305 },
  { year: "2002", sales: 237 },
  { year: "2003", sales: 73 },
  { year: "2004", sales: 209 },
  { year: "2005", sales: 214 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
};

const SaleChart = () => {
  const [position, setPosition] = useState("Weekly Sales");
  const [data, setData] = useState(weeklyChartData);
  const [dataKey, setDataKey] = useState("day");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sales Analytics</CardTitle>
        <CardDescription>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {position} <ChevronDown />{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem
                  onClick={() => {
                    setData(weeklyChartData);
                    setDataKey("day");
                  }}
                  value="Weekly Sales"
                >
                  Weekly Sales
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  onClick={() => {
                    setData(monthlyChartData);
                    setDataKey("month");
                  }}
                  value="Monthly Sales"
                >
                  Monthly Sales
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  onClick={() => {
                    setData(yearlyChartData);
                    setDataKey("year");
                  }}
                  value="Yearly Sales"
                >
                  Yearly Sales
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[35vh]">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                if(dataKey === 'year'){
                    return value.slice(0, 4)
                }
                return value.slice(0, 3)
            }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SaleChart;
