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

# Application backend

The application backend server (express) is running in a AWS ec2 instance
