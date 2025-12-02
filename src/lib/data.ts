import type { PotholeDetection } from './types';
import { PlaceHolderImages } from './placeholder-images';

const roadImage1 = PlaceHolderImages.find((img) => img.id === 'road-1')!;
const roadImage2 = PlaceHolderImages.find((img) => img.id === 'road-2')!;
const roadImage3 = PlaceHolderImages.find((img) => img.id === 'road-3')!;
const roadImage4 = PlaceHolderImages.find((img) => img.id === 'road-4')!;


export const mockDetections: PotholeDetection[] = [
  {
    id: 'detection-1',
    timestamp: new Date('2024-07-28T10:30:00Z').getTime(),
    imageUrl: roadImage1.imageUrl,
    imageHint: roadImage1.imageHint,
    location: {
      latitude: 34.052235,
      longitude: -118.243683,
    },
    pothole_probability: 0.92,
    detections: [
      {
        label: 'pothole',
        confidence: 0.95,
        bbox: [0.5, 0.5, 0.2, 0.15],
      },
      {
        label: 'pothole',
        confidence: 0.88,
        bbox: [0.2, 0.3, 0.1, 0.1],
      },
    ],
  },
  {
    id: 'detection-2',
    timestamp: new Date('2024-07-28T11:05:00Z').getTime(),
    imageUrl: roadImage2.imageUrl,
    imageHint: roadImage2.imageHint,
    location: {
      latitude: 40.712776,
      longitude: -74.005974,
    },
    pothole_probability: 0.78,
    detections: [
      {
        label: 'pothole',
        confidence: 0.82,
        bbox: [0.7, 0.6, 0.25, 0.2],
      },
    ],
  },
  {
    id: 'detection-3',
    timestamp: new Date('2024-07-27T14:00:00Z').getTime(),
    imageUrl: roadImage3.imageUrl,
    imageHint: roadImage3.imageHint,
    location: {
      latitude: 41.878113,
      longitude: -87.629799,
    },
    pothole_probability: 0.98,
    detections: [
      {
        label: 'pothole',
        confidence: 0.99,
        bbox: [0.45, 0.55, 0.3, 0.25],
      },
      {
        label: 'crack',
        confidence: 0.75,
        bbox: [0.1, 0.1, 0.8, 0.05],
      },
    ],
  },
    {
    id: 'detection-4',
    timestamp: new Date('2024-07-26T09:12:00Z').getTime(),
    imageUrl: roadImage4.imageUrl,
    imageHint: roadImage4.imageHint,
    location: {
      latitude: 29.760427,
      longitude: -95.369804,
    },
    pothole_probability: 0.65,
    detections: [
      {
        label: 'pothole',
        confidence: 0.70,
        bbox: [0.8, 0.75, 0.15, 0.15],
      },
    ],
  },
];
