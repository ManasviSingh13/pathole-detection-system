'use client';

import { useState } from 'react';
import { mockDetections } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


// Mock SummarizePotholeDetections
async function summarizePotholeDetections(input: { potholeData: string }): Promise<{ summary: string }> {
  console.log('Simulating pothole detection summarization...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  const detections = JSON.parse(input.potholeData);
  const totalDetections = detections.reduce((acc: number, curr: any) => acc + curr.detections.length, 0);
  const highSeverityCount = detections.flatMap((d: any) => d.detections).filter((p: any) => p.confidence > 0.9).length;

  return {
    summary: `Analysis of ${detections.length} images complete. A total of ${totalDetections} potholes were detected. Of these, ${highSeverityCount} are classified as high severity and require immediate attention. The primary concentration of high-severity potholes is located in the downtown area, particularly around Main Street.`,
  };
}

// Mock suggestImprovementActions
async function suggestImprovementActions(input: { potholeDetectionSummary: string }): Promise<{
  suggestedActions: string;
  resourceAllocation: string;
}> {
  console.log('Simulating improvement suggestions...');
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    suggestedActions: `1. **Immediate Action:** Dispatch a rapid repair crew to address the ${mockDetections.flatMap(d => d.detections).filter(d => d.confidence > 0.9).length} high-severity potholes identified on Main Street.
2. **Short-Term (1-2 weeks):** Conduct a full survey of the downtown area to identify other potential hazards.
3. **Long-Term (3-6 months):** Schedule a full resurfacing project for Main Street and surrounding roads based on the comprehensive survey.`,
    resourceAllocation: `1. **Rapid Repair Crew:** Allocate one truck and a two-person crew for immediate dispatch. Estimated time: 8-10 hours.
2. **Survey Team:** Assign one surveyor with a mapping device. Estimated time: 3 days.
3. **Resurfacing Project:** Requires capital budget approval. Plan for a 4-week project with a full paving crew and equipment.`,
  };
}


export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<{
    suggestedActions: string;
    resourceAllocation: string;
  } | null>(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    setSummary(null);
    setSuggestions(null);

    const summaryResult = await summarizePotholeDetections({
      potholeData: JSON.stringify(mockDetections, null, 2),
    });
    setSummary(summaryResult.summary);

    const suggestionsResult = await suggestImprovementActions({
      potholeDetectionSummary: summaryResult.summary,
    });
    setSuggestions(suggestionsResult);

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Reports</CardTitle>
          <CardDescription>
            Generate a comprehensive summary of all pothole detections and get
            AI-driven recommendations for maintenance and repair.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateReport} disabled={loading}>
            <Wand2 className="mr-2 h-4 w-4" />
            {loading ? 'Generating Report...' : 'Generate Report'}
          </Button>
        </CardContent>
      </Card>

      {loading && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
          </Card>
        </div>
      )}

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Detection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">{summary}</p>
          </CardContent>
        </Card>
      )}

      {suggestions && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">
                {suggestions.suggestedActions}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">
                {suggestions.resourceAllocation}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
