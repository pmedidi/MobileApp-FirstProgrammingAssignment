import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Index({ navigation }) {  // Destructure the navigation prop
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Travel Companion</Text>
      <Text style={styles.description}>
        Plan your travels, explore attractions, and organize your itinerary with ease.
      </Text>
      
      {/* Navigation buttons */}
      <Button
        title="Go to Add Plan"
        onPress={() => navigation.navigate('add-plan')}
        color="#007BFF"
      />
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
});
