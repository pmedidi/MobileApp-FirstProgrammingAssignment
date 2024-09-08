import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Explore() {
  const [location, setLocation] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      console.log("Requesting location permissions...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      console.log("Fetching current location...");
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const lat = currentLocation.coords.latitude;
      const lng = currentLocation.coords.longitude;
      console.log(`Location fetched: Latitude: ${lat}, Longitude: ${lng}`);

      // Adjusting radius to 500 meters for faster results
      fetchAttractions(lat, lng, 5000); 
    };

    const fetchAttractions = async (lat, lng, radius) => {
      console.log("Fetching nearby attractions...");
      const API_KEY = 'AIzaSyBFDc_yLeqW6gKyZ1R0HvD_Dq9K9HOFZew'; // Your actual key
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=tourist_attraction&key=${API_KEY}`;
      
      try {
        const response = await axios.get(apiUrl);
        console.log("Attractions data received:", response.data.results);
        setAttractions(response.data.results);
      } catch (error) {
        console.error("Error fetching attractions:", error);
      } finally {
        setLoading(false);  // Stop the loader when fetching is done
      }
    };

    fetchLocation();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nearby Attractions</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading attractions...</Text>
        </View>
      ) : attractions.length > 0 ? (
        attractions.map((attraction, index) => (
          <View key={index} style={styles.attractionItem}>
            <Text style={styles.attractionName}>{attraction.name}</Text>
            <Text>{attraction.vicinity}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noAttractionsText}>No attractions found in the area.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  attractionItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noAttractionsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
