import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Index({ navigation }) {  // Destructure the navigation prop
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Travel Companion</Text>
      <Text style={styles.description}>
        Plan your travels, explore attractions, and organize your itinerary with ease.
      </Text>
      
      {/* Description for Go to Add Plan */}
      <Text style={styles.buttonDescription}>Create a new travel plan for your upcoming trip.</Text>
      <Button
        title="Go to Add Plan"
        onPress={() => navigation.navigate('add-plan')}
        color="#007BFF"
      />
      
      {/* Description for Go to Itinerary */}
      <Text style={styles.buttonDescription}>View and manage your saved travel itinerary.</Text>
      <Button
        title="Go to Itinerary"
        onPress={() => navigation.navigate('itinerary')}
        color="#007BFF"
      />
      
      {/* Removed the Explore Attractions button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
});