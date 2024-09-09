import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function Explore() {
  const [attractions, setAttractions] = useState([]);
  const route = useRoute();
  const { city, state, country } = route.params;

  useEffect(() => {
    if (city && state && country) {
      fetchAttractions(city, state, country);
    } else {
      Alert.alert('No destination selected');
    }
  }, [city, state, country]);

  const fetchAttractions = async (city, state, country) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=attractions+in+${city}+${state}+${country}&key=AIzaSyBFDc_yLeqW6gKyZ1R0HvD_Dq9K9HOFZew`
      );
      setAttractions(response.data.results);
    } catch (error) {
      console.error('Error fetching attractions:', error);
      Alert.alert('Failed to fetch attractions.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore Attractions in {city}, {state}, {country}</Text>
      {attractions.length > 0 ? (
        attractions.map((attraction, index) => (
          <View key={index} style={styles.attractionContainer}>
            <Text>{attraction.name}</Text>
            <Text>{attraction.formatted_address}</Text>
          </View>
        ))
      ) : (
        <Text>No attractions found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  attractionContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
});
