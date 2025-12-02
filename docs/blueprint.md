# **App Name**: Pothole Patrol

## Core Features:

- Image Upload: Allow users to upload images of road surfaces via multipart/form-data or JSON (base64 encoded).
- Pothole Detection: Run YOLO-based pothole detection using OpenCV for preprocessing and postprocessing on uploaded images.
- Detection Results: Generate JSON output with a pothole detection summary, including pothole probability, detections array (label, confidence, bbox), storage image URL, and document ID.
- Data Storage: Store original images in Google Cloud Storage and detection records in a Firestore collection named `pothole_detections`.
- Location Metadata: Capture optional metadata, including latitude, longitude, device ID, and timestamp, with each image.
- Security Layer: Protect service endpoints via Firebase Authentication or API Key
- Model Selection Tool: A tool to enable administrators to select and deploy custom trained YOLO models.

## Style Guidelines:

- Primary color: Asphalt Gray (#595959) for a direct visual tie to the road surface.
- Background color: Off-white (#F0F0F0), providing a clear backdrop.
- Accent color: Safety Cone Orange (#E67300), offering high visibility for important actions and alerts.
- Body font: 'Inter', sans-serif, used for the primary text throughout the application to maintain clarity and readability.
- Headline font: 'Space Grotesk', sans-serif, providing a techy and modern feel that complements the application’s purpose.
- Use material design icons to clearly communicate potholes presence, severity and confidence level.
- Design a layout optimized for mobile devices to make data accessible and UI controls comfortably sized and arranged.