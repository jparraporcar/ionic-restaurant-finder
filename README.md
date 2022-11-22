
Necessary steps for running the applications:

0. xcode-select --install

   ios IDE it is necessary, among others, to run the simulator device

1. npm install -g @ionic/cli

   installing the ionic command line interface

2. npm install

   install dependencies

3. npm run build

   build web bundle

4. npx cap add ios

   add capacitor ios pluggins

5. ionic cap sync

   sync de web assets with the ios code

6. ionic cap run ios -l

   run the application in a simulator device

# Application backend

The application backend server (express) is running in a AWS ec2 instance

# Necessary steps to install and test the application
