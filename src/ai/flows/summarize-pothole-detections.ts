'use server';
/**
 * @fileOverview Summarizes pothole detection data to identify trends and insights.
 *
 * - summarizePotholeDetections - A function that summarizes pothole detections.
 * - SummarizePotholeDetectionsInput - The input type for the summarizePotholeDetections function.
 * - SummarizePotholeDetectionsOutput - The return type for the summarizePotholeDetections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePotholeDetectionsInputSchema = z.object({
  potholeData: z.string().describe('A JSON string containing an array of pothole detection records. Each record should include location metadata (latitude, longitude), detection confidence, and any other relevant fields.'),
});
export type SummarizePotholeDetectionsInput = z.infer<typeof SummarizePotholeDetectionsInputSchema>;

const SummarizePotholeDetectionsOutputSchema = z.object({
  summary: z.string().describe('A summary of the pothole detections, including trends, insights, and potential areas for prioritization.'),
});
export type SummarizePotholeDetectionsOutput = z.infer<typeof SummarizePotholeDetectionsOutputSchema>;

export async function summarizePotholeDetections(input: SummarizePotholeDetectionsInput): Promise<SummarizePotholeDetectionsOutput> {
  return summarizePotholeDetectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePotholeDetectionsPrompt',
  input: {schema: SummarizePotholeDetectionsInputSchema},
  output: {schema: SummarizePotholeDetectionsOutputSchema},
  prompt: `You are a data analyst specializing in road maintenance.

You are provided with pothole detection data, which includes location metadata, detection confidence, and other relevant fields.

Your task is to summarize the pothole detections, identify trends and insights, and provide a summary that can be used to prioritize road maintenance efforts.

Pothole Data: {{{potholeData}}}

Summary:`,
});

const summarizePotholeDetectionsFlow = ai.defineFlow(
  {
    name: 'summarizePotholeDetectionsFlow',
    inputSchema: SummarizePotholeDetectionsInputSchema,
    outputSchema: SummarizePotholeDetectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
