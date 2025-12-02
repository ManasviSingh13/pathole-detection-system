'use server';

/**
 * @fileOverview A flow for suggesting improvement actions based on pothole detections.
 *
 * - suggestImprovementActions - A function that suggests improvement actions for road conditions.
 * - SuggestImprovementActionsInput - The input type for the suggestImprovementActions function.
 * - SuggestImprovementActionsOutput - The return type for the suggestImprovementActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovementActionsInputSchema = z.object({
  potholeDetectionSummary: z
    .string()
    .describe('A summary of pothole detections, including number, severity, and location.'),
  locationMetadata: z
    .string()
    .optional()
    .describe('Optional metadata about the location, including latitude, longitude, device ID, and timestamp.'),
});
export type SuggestImprovementActionsInput = z.infer<
  typeof SuggestImprovementActionsInputSchema
>;

const SuggestImprovementActionsOutputSchema = z.object({
  suggestedActions: z
    .string()
    .describe('A list of suggested improvement actions for road conditions.'),
  resourceAllocation: z
    .string()
    .describe('Suggested resource allocation for the improvement actions.'),
});
export type SuggestImprovementActionsOutput = z.infer<
  typeof SuggestImprovementActionsOutputSchema
>;

export async function suggestImprovementActions(
  input: SuggestImprovementActionsInput
): Promise<SuggestImprovementActionsOutput> {
  return suggestImprovementActionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovementActionsPrompt',
  input: {schema: SuggestImprovementActionsInputSchema},
  output: {schema: SuggestImprovementActionsOutputSchema},
  prompt: `You are an expert city planner specializing in road maintenance and repair.

Based on the following pothole detection summary and location metadata, suggest improvement actions and resource allocation strategies.

Pothole Detection Summary: {{{potholeDetectionSummary}}}
Location Metadata: {{{locationMetadata}}}

Suggest concrete actions to improve road conditions, including specific repair strategies and resource allocation plans. Consider factors like the severity of the potholes, their location, and available resources. The suggested actions and resource allocation should be detailed and actionable for city maintenance crews. The actions should be comprehensive, covering short-term repairs and long-term preventative measures.`,
});

const suggestImprovementActionsFlow = ai.defineFlow(
  {
    name: 'suggestImprovementActionsFlow',
    inputSchema: SuggestImprovementActionsInputSchema,
    outputSchema: SuggestImprovementActionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
