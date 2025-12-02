'use client';

import { useState } from 'react';
import { summarizePotholeDetections } from '@/ai/flows/summarize-pothole-detections';
import { suggestImprovementActions } from '@/ai/flows/suggest-improvement-actions';
import { mockDetections } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
