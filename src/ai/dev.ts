import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-pothole-detections.ts';
import '@/ai/flows/deploy-custom-yolo-models.ts';
import '@/ai/flows/suggest-improvement-actions.ts';