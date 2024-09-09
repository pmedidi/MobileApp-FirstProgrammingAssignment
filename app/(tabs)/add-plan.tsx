import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { db, collection, addDoc } from '../../firebase'; // Import Firebase methods

export default function AddPlan({ navigation }) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const addTravelPlan = async () => {
    if (!city || !state || !country) {
      setMessage('Please fill out all fields.');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'travelPlans'), {
        city,
        state,
        country,
      });
      setMessage('Travel Plan added successfully!');
      setCity('');
      setState('');
      setCountry('');
    } catch (e) {
      setMessage('Error adding Travel Plan');
      console.error('Error adding document: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Travel Plan</Text>

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>State</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter state"
        value={state}
        onChangeText={setState}
      />

      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter country"
        value={country}
        onChangeText={setCountry}
      />

      <Button title="Add Travel Plan" onPress={addTravelPlan} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 20,
    color: 'green',
  },
});
