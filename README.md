# MINDE MobileClient
<a name="top"></a>
Machine Learning for Network-Denied Environments (MINDE) is a machine learning project aimed at demonstrating the effectiveness of a hybrid approach to distributing software solutions to network-denied environments. The project combines cloud-based servers and web clients with an offline mobile client that can perform image classification and be incrementally fine-tuned. 

The MobileClient is a mobile application developed for the project using Expo Go React Native and Expo Go that is deployable on iOS and Android platforms. 

## MobileClient Overview
Moblie Client works by collecting and sorting images from your phone's camera or photo library. If the automatic classification is incorrect, the user can relabel it, perhaps with labels they have never seen before.

When a network connection is available, the mobile client uploads the new image to the server along with the user-supplied tags. The server and its web client allow the user to retrain/fine-tune the classification model using this new data and send the new model back to the mobile client.

When unable to communicate with the server, the mobile client will attempt to exchange images, labels, and updated models using peer-to-peer communication with another mobile client.

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

