'use client';

import Image from 'next/image';
import customData from '@/lib/custom-data.json';
import { mockDetections } from '@/lib/data';
import type { PotholeDetection } from '@/lib/types';

import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
DialogTrigger,
} from '@/components/ui/dialog';

import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from '@/components/ui/table';

import {
AlertTriangle,
MapPin,
Percent
} from 'lucide-react';

import { format } from 'date-fns';

import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
} from 'recharts';

const allDetections = [
...customData,
...mockDetections
];

function StatCard({
title,
value,
icon,
}:{
title:string;
value:string|number;
icon:React.ReactNode;
}){

return(

<Card>

<CardHeader className="flex flex-row justify-between">

<CardTitle className="text-sm">

{title}

</CardTitle>

{icon}

</CardHeader>

<CardContent>

<div className="text-2xl font-bold">

{value}

</div>

</CardContent>

</Card>

)

}

function DetectionDialog({
detection,
}:{
detection:PotholeDetection;
}){

return(

<Dialog>

<DialogTrigger asChild>

<Button variant="outline">

View Details

</Button>

</DialogTrigger>

<DialogContent>

<DialogHeader>

<DialogTitle>

{detection.id}

</DialogTitle>

<DialogDescription>

{format(
new Date(
detection.timestamp
),
'PPP p'
)}

</DialogDescription>

</DialogHeader>

<Table>

<TableHeader>

<TableRow>

<TableHead>
Label
</TableHead>

<TableHead>
Confidence
</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{detection.detections.map(
(d,i)=>(

<TableRow key={i}>

<TableCell>
{d.label}
</TableCell>

<TableCell>

{(d.confidence*100).toFixed(0)}%

</TableCell>

</TableRow>

)

)}

</TableBody>

</Table>

</DialogContent>

</Dialog>

)

}

export default function DashboardPage(){

const totalDetections=
allDetections.reduce(
(acc,curr)=>
acc+curr.detections.length,
0
);

const highSeverity=
allDetections
.flatMap(
d=>d.detections
)
.filter(
d=>d.confidence>0.9
)
.length;

const mediumSeverity=
allDetections
.flatMap(
d=>d.detections
)
.filter(
d=>d.confidence>0.8 &&
d.confidence<=0.9
)
.length;

const lowSeverity=
allDetections
.flatMap(
d=>d.detections
)
.filter(
d=>d.confidence<=0.8
)
.length;

const avgConfidence=(
allDetections
.flatMap(
d=>d.detections
)
.reduce(
(acc,curr)=>
acc+curr.confidence,
0
)
/totalDetections*100
).toFixed(0);

const chartData=[

{
name:"High",
value:highSeverity
},

{
name:"Medium",
value:mediumSeverity
},

{
name:"Low",
value:lowSeverity
}

];

return(

<div className="flex flex-col gap-6 p-6">

<div className="grid gap-4 md:grid-cols-3">

<StatCard
title="Total Potholes"
value={totalDetections}
icon={<AlertTriangle/>}
/>

<StatCard
title="High Severity"
value={highSeverity}
icon={<AlertTriangle/>}
/>

<StatCard
title="Avg Confidence"
value={`${avgConfidence}%`}
icon={<Percent/>}
/>

</div>

<Card>

<CardHeader className="flex flex-row justify-between">

<CardTitle>
Pothole Analytics
</CardTitle>

<Button onClick={()=>window.print()}>
Download Report
</Button>

</CardHeader>

<CardContent className="h-[300px]">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={chartData}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>

<Cell fill="#ef4444"/>
<Cell fill="#eab308"/>
<Cell fill="#22c55e"/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</CardContent>

</Card>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

{allDetections.map((detection)=>(

<Card key={detection.id}>

<CardHeader>

<div className="relative h-[200px]">

<Image
src={detection.imageUrl}
alt="road"
fill
className="rounded-lg object-cover"
/>

</div>

<CardTitle>

{detection.id}

</CardTitle>

<CardDescription>

{format(
new Date(
detection.timestamp
),
'PP'
)}

</CardDescription>

</CardHeader>

<CardContent>

<div className="flex items-center gap-2">

<MapPin size={16}/>

<span>

{detection.location.latitude.toFixed(2)},
{" "}
{detection.location.longitude.toFixed(2)}

</span>

</div>

</CardContent>

<CardFooter>

<DetectionDialog
detection={detection}
/>

</CardFooter>

</Card>

))}

</div>

</div>

)

}