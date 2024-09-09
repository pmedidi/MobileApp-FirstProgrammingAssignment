# Welcome to the Travel Companion Expo App! 🌍✈️

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## About the App

Travel Companion is an application that allows users to plan trips and explore attractions in the destination city. Follow these steps to make the most out of this app:

1. **Add a Travel Plan**:  
   - Navigate to the **Add Plan** page.
   - Enter the **city**, **state**, and **country** you plan to visit.
   - Make sure not to misspell the city, state, or country, as it will affect the search functionality later.

2. **View Your Itinerary**:  
   - After adding your travel plan, go to the **Itinerary** page.
   - You’ll see the destinations you’ve entered.
   - Select a city from your itinerary and **click "Explore"** to view attractions in that area.

3. **Explore Attractions**:  
   - Once you’ve selected a destination from the **Itinerary** page, go to the **Explore** page.
   - This will show you nearby attractions based on the destination you selected.

⚠️ **Important Note**:  
You must first visit the **Itinerary** page and select a destination before going to the **Explore** page.  
**If you go to the Explore page without selecting a destination, the app will crash because there will be no location data to search for attractions.**

## Get Started

1. **Install dependencies**:

   ```bash
   npm install
2. **Start The App**:
   npx expo start


In the output, you'll find options to open the app in a:

development build
Android emulator
iOS simulator
Expo Go, a limited sandbox for trying out app development with Expo
You can start developing by editing the files inside the app directory. This project uses file-based routing.

**App Navigation**
Home Page: Displays a welcome message and a brief description of the app’s functionality.
Add Plan: Navigate to this page to add your travel destination.
Itinerary: View the cities you’ve added and choose one to explore.
Explore: After selecting a city, you can navigate to this page to see the attractions in the area.


When you're ready, run:

npm run reset-project

