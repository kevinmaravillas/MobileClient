# MINDE Mobile Client

Machine Learning for Network-Denied Environments (MlNDE) is a machine learning project aimed at demonstrating the effectiveness of a hybrid approach to distributing software solutions to network-denied environments. The project combines a cloud-based server with a web user interface, and an offline mobile app with an image classification AI model that can be incrementally fine-tuned server-side.
With these componenets, MlNDE explores a peer-to-peer method for delivering updates to machince learning models on devices with little-to-no internet connection.

For more about the project visit [here](https://ascent.cysun.org/project/project/view/206) or view the [presentation slides](https://docs.google.com/presentation/d/13EFhmbbCMPtfYBnF4iBhyzKesb5ix88vZ7o3OJCPOOM/edit?usp=sharing)


### MINDE Systems
- [Web Client](https://github.com/Chaoward/Senior-Cap_WebClient)
- [Server](https://github.com/Chaoward/MlNDE_Server/) 

# About the Mobile Client
Moblie Client works by collecting and sorting images from your phone's camera or photo library. If the automatic classification is incorrect, the user can relabel it, perhaps with labels they have never seen before.

When a network connection is available, the mobile client uploads the new image to the server along with the user-supplied tags. The server and its web client allow the user to retrain/fine-tune the classification model using this new data and send the new model back to the mobile client.

When unable to communicate with the server, the mobile client will attempt to exchange images, labels, and updated models using peer-to-peer communication with another mobile client.

### Video Demo:
https://github.com/kevinmaravillas/MobileClient/assets/146474106/88bdbc7c-3053-4340-8825-408c39df6d38


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

