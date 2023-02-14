# Necessary commands to execute to run the application in a simulator device

1. xcode-select --install

   Installing the ios IDE Xcode. If Xcode it's already installed, the following error message will appear:
   'xcode-select: error: command line tools are already installed, use "Software Update" to install updates'

2. npm install -g @ionic/cli

   installing the ionic command line interface

3. npm install

   install dependencies

4. npm run build

   build web bundle

5. npx cap add ios

   add capacitor ios pluggins

6. ionic cap sync

   sync de web assets with the ios code

7. ionic cap run ios -l

   run the application in a simulator device
   
Below 2 screenshoots of the up running in a local machine

<img width="387" alt="Card" src="https://user-images.githubusercontent.com/17023422/218709691-05a91d96-20e8-4833-abda-4aa08d47a9c8.png" width="200">     <img width="387" alt="Details" src="https://user-images.githubusercontent.com/17023422/218709812-c0c29796-185e-41e0-b0bd-57bc4ac0efb1.png" width="200">


