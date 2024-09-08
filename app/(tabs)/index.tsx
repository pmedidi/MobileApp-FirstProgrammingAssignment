import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function Index({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Travel Companion</Text>
      <Button
        title="Add a Travel Plan"
        onPress={() => navigation.navigate('add-plan')}
      />
      <Button
        title="View Itinerary"
        onPress={() => navigation.navigate('itinerary')}
      />
      <Button
        title="Explore Attractions"
        onPress={() => navigation.navigate('explore')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
