# Short summary (documentation preparation ongoing)

This is a restaurant finder app built for practicing purpouses.
The app that I have used as a reference is located in the following github repository:
https://github.com/alanmontgomery/ionic-restaurant-finder

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
