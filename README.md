# MINDE MobileClient
<a name="top"></a>
Machine Learning for Network-Denied Environments (MINDE) is a machine learning project based on network-denied environments, aiming to combine cloud-based servers and web clients with mobile clients. MobileClient is part of the project which is a mobile application developed for iOS and Android platforms using Expo Go React Native and Expo Go. 

## MobileClient Overview
It enables the collection and classification of images directly from the phone’s camera or from its photo library. 
If the automatic classification is not correct, the user can relabel it, potentially with a label that has never been seen before. 
When a network connection is available, the mobile client will upload new images to the server along with any user-supplied labels. 
The server and its web client allow users to retrain/fine-tune the classification model with this new data and send the new model back to the mobile client. 
Alternatively, when communication with the server is not possible, the mobile client will attempt to use peer-to-peer communication with another 
mobile client to exchange images, labels, and updated models.

### Video Demo:
https://github.com/kevinmaravillas/MobileClient/assets/146474106/88bdbc7c-3053-4340-8825-408c39df6d38

### Powerpoint Demo Slides:
https://docs.google.com/presentation/d/13EFhmbbCMPtfYBnF4iBhyzKesb5ix88vZ7o3OJCPOOM/edit?usp=sharing

### MINDE Systems
- [Web Client](https://github.com/Chaoward/Senior-Cap_WebClient)
- [Server](https://github.com/Chaoward/MlNDE_Server/)


## Features
- **Image Classification**: Utilizes the device's camera and photo gallery to pick an image, crop it, and classify it.
- **Server Interaction**: If the classification is incorrect, the app allows users to upload the image and the correct label to the server for further analysis.
- **Model Selection**: Users can change between classification models, and a refresh button checks for new model versions.
- **Offline Support**: The app disables image uploading and model version checking when the network is offline.

## Getting Started
### Installation
To run the MobileClient application locally on your development machine, follow these steps:

1. Clone the repository:
   ```bash
   # Access through Github Desktop
   # or
   git clone https://github.com/kevinmaravillas/MobileClient.git
   ```
2. Install dependencies using npm:
   ```bash
   npm install
   ```
3. Start the Metro bundler:
   ```bash
   npm start
   #or
   npx expo start
   ```
## Sponsor
Proudly sponsored by NSIN/ICT USC and Cal State LA Senior Capstone

