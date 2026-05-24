'use client';

import { useEffect, useState, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { uploadDetection } from './actions';
import { LocateFixed, UploadCloud } from 'lucide-react';

const initialState = {
  message: '',
  success: false,
};

function SubmitButton() {
  return (
    <Button type="submit" className="w-full">
      <UploadCloud className="mr-2 h-4 w-4" />
      Upload and Analyze
    </Button>
  );
}

export default function UploadPage() {
  const [state, formAction] = useActionState(
    uploadDetection,
    initialState
  );

  const { toast } = useToast();
  const [location, setLocation] = useState({
    lat: '',
    lon: '',
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString(),
          });

          toast({
            title: 'Location Acquired',
            description:
              'Latitude and Longitude have been filled in.',
          });
        },
        () => {
          toast({
            title: 'Location Error',
            description:
              'Could not retrieve your location. Please enter it manually.',
            variant: 'destructive',
          });
        }
      );
    } else {
      toast({
        title: 'Geolocation Not Supported',
        description:
          'Your browser does not support geolocation.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>Submit a New Detection</CardTitle>
        <CardDescription>
          Upload an image of a road surface to detect potholes.
          Location data is optional but recommended.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>

            <Input
              id="image"
              name="image"
              type="file"
              required
              accept="image/*"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Location (Optional)</Label>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleGetLocation}
              >
                <LocateFixed className="mr-2 h-4 w-4" />
                Get Current Location
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">
                  Latitude
                </Label>

                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="e.g., 34.0522"
                  value={location.lat}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      lat: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">
                  Longitude
                </Label>

                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="e.g., -118.2437"
                  value={location.lon}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      lon: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}