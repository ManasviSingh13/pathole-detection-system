'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { mockDetections } from '@/lib/data';

const uploadSchema = z.object({
  image: z.any(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export async function uploadDetection(
  prevState: any,
  formData: FormData
) {

  const validatedFields = uploadSchema.safeParse({
    image: formData.get('image'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      success: false,
    };
  }

  const file = validatedFields.data.image;

  if (!file || file.size === 0) {
    return {
      message: 'Please upload image.',
      success: false,
    };
  }

  const newDetection = {
    id: `POT-${Date.now()}`,

    timestamp: Date.now(),

    imageUrl:
      "https://placehold.co/600x400/png?text=New+Pothole",

    imageHint: 'road pothole',

    location: {
      latitude: Number(
        validatedFields.data.latitude || 25.31
      ),

      longitude: Number(
        validatedFields.data.longitude || 82.97
      ),
    },

    pothole_probability: 0.93,

    detections: [
      {
        label: 'pothole',
        confidence: 0.93,
        bbox: [0.5, 0.5, 0.2, 0.2],
      },
    ],
  };

  mockDetections.unshift(newDetection);

  revalidatePath('/dashboard');

  return {
    message: 'Detection Added Successfully',
    success: true,
  };
}