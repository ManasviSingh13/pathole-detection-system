'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Rocket, Terminal, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data types from the removed AI flow
export type DeployCustomYOLOModelInput = z.infer<typeof formSchema>;

export interface DeployCustomYOLOModelOutput {
  deploymentStatus: string;
  evaluationSummary: string;
}

// Mock function to simulate AI flow
async function deployCustomYOLOModel(
  input: DeployCustomYOLOModelInput
): Promise<DeployCustomYOLOModelOutput> {
  console.log('Simulating model deployment with input:', input);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    deploymentStatus: `Model ${input.modelName} deployment is pending. The model will be deployed from ${input.modelUri}.`,
    evaluationSummary: `The YOLO model evaluation is pending. Further details on performance will be provided upon deployment.\nModel Description: ${input.modelDescription}`,
  };
}


const formSchema = z.object({
  modelName: z.string().min(3, 'Model name must be at least 3 characters.'),
  modelDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  modelUri: z.string().url('Must be a valid URI (e.g., gs://bucket/model).'),
});

export default function ModelsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeployCustomYOLOModelOutput | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: '',
      modelDescription: '',
      modelUri: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const deploymentResult = await deployCustomYOLOModel(values);
    setResult(deploymentResult);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deploy a Custom Model</CardTitle>
          <CardDescription>
            Deploy a new custom-trained YOLO model for pothole detection.
            Provide the model details and URI to begin the deployment process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., yolov8-pothole-v2" {...field} />
                    </FormControl>
                    <FormDescription>
                      A unique name for your model.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the training data, performance metrics, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description for evaluation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelUri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model URI</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="gs://your-bucket/path/to/model"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The Google Cloud Storage URI of the model file.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                <Rocket className="mr-2 h-4 w-4" />
                {loading ? 'Deploying...' : 'Deploy Model'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {loading && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Deployment in Progress</AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Deployment Process Initiated!</AlertTitle>
          <AlertDescription className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold">Deployment Status</h4>
              <p className="text-sm text-muted-foreground">
                {result.deploymentStatus}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Evaluation Summary</h4>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {result.evaluationSummary}
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
