export interface PotholeDetection {
  id: string;
  timestamp: number;
  imageUrl: string;
  imageHint: string;
  location: {
    latitude: number;
    longitude: number;
  };
  pothole_probability: number;
  detections: {
    label: string;
    confidence: number;
    bbox: [number, number, number, number]; // [x_center, y_center, width, height] normalized
  }[];
}
