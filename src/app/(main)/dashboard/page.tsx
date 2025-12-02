import Image from 'next/image';
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
import { Badge } from '@/components/ui/badge';
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
import { AlertTriangle, MapPin, Percent, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function DetectionDialog({ detection }: { detection: PotholeDetection }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detection Details: {detection.id}</DialogTitle>
          <DialogDescription>
            {format(new Date(detection.timestamp), 'PPP p')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={detection.imageUrl}
              alt={`Pothole detection ${detection.id}`}
              fill
              className="object-cover"
              data-ai-hint={detection.imageHint}
            />
            {detection.detections.map((d, i) => {
              const [x_center, y_center, width, height] = d.bbox;
              const x = x_center - width / 2;
              const y = y_center - height / 2;
              const style = {
                position: 'absolute',
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                width: `${width * 100}%`,
                height: `${height * 100}%`,
              } as React.CSSProperties;
              return (
                <div
                  key={i}
                  style={style}
                  className="rounded-sm border-2 border-accent"
                >
                  <Badge
                    variant="destructive"
                    className="absolute -left-[2px] -top-[20px] rounded-sm rounded-b-none border-accent bg-accent text-accent-foreground"
                  >
                    {d.label}
                  </Badge>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Detections</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detection.detections.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{d.label}</TableCell>
                    <TableCell>{(d.confidence * 100).toFixed(0)}%</TableCell>
                    <TableCell>
                      <Badge
                        variant={d.confidence > 0.9 ? 'destructive' : 'secondary'}
                      >
                        {d.confidence > 0.9 ? 'High' : 'Medium'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DashboardPage() {
  const totalDetections = mockDetections.reduce(
    (acc, curr) => acc + curr.detections.length,
    0
  );
  const highSeverityDetections = mockDetections.flatMap(d => d.detections).filter(d => d.confidence > 0.9).length;
  const avgConfidence = (mockDetections.flatMap(d => d.detections).reduce((acc, curr) => acc + curr.confidence, 0) / totalDetections * 100).toFixed(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Potholes" value={totalDetections} icon={<AlertTriangle className="h-4 w-4"/>} />
        <StatCard title="High Severity" value={highSeverityDetections} icon={<AlertTriangle className="h-4 w-4 text-destructive"/>} />
        <StatCard title="Avg. Confidence" value={`${avgConfidence}%`} icon={<Percent className="h-4 w-4"/>} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockDetections.map((detection) => (
          <Card key={detection.id}>
            <CardHeader>
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={detection.imageUrl}
                  alt={`Pothole detection ${detection.id}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={detection.imageHint}
                />
              </div>
              <CardTitle className="text-lg">ID: {detection.id}</CardTitle>
              <CardDescription>
                {format(new Date(detection.timestamp), 'PP')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {detection.location.latitude.toFixed(4)},{' '}
                  {detection.location.longitude.toFixed(4)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>{detection.detections.length} potholes detected</span>
              </div>
            </CardContent>
            <CardFooter>
              <DetectionDialog detection={detection} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
