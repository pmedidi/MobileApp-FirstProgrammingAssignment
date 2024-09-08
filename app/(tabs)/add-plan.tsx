import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db, collection, addDoc } from '../../firebase';

export default function AddPlan({ navigation }) {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const saveTravelPlan = async () => {
    try {
      await addDoc(collection(db, 'travelPlans'), {
        destination,
        date,
        notes
      });
      Alert.alert("Success", "Travel plan saved!");
      navigation.navigate('Itinerary');  // Navigate to itinerary after saving
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Destination:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        placeholderTextColor="#ccc"  // Placeholder color for visibility
        onChangeText={setDestination}
        value={destination}
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        placeholderTextColor="#ccc"  // Placeholder color for visibility
        onChangeText={setDate}
        value={date}
      />
      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter notes"
        placeholderTextColor="#ccc"  // Placeholder color for visibility
        onChangeText={setNotes}
        value={notes}
      />
      <Button title="Save Plan" onPress={saveTravelPlan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background for the container
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: '#fff', // White text color for labels
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#333', // Darker background for inputs
    color: '#fff', // White text for the inputs
  }
});
