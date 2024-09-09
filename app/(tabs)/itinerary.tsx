import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { db, collection, getDocs } from '../../firebase'; // Firebase methods
import { useNavigation } from '@react-navigation/native';

export default function Itinerary() {
  const [plans, setPlans] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlans = async () => {
      const querySnapshot = await getDocs(collection(db, 'travelPlans'));
      const plansArray = [];
      querySnapshot.forEach((doc) => {
        plansArray.push({ ...doc.data(), id: doc.id });
      });
      setPlans(plansArray);
    };
    fetchPlans();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Itinerary</Text>
      {plans.length > 0 ? (
        plans.map((plan) => (
          <View key={plan.id} style={styles.planContainer}>
            <Text>{`${plan.city}, ${plan.state}, ${plan.country}`}</Text>
            <Button
              title="Explore"
              onPress={() => navigation.navigate('explore', { city: plan.city, state: plan.state, country: plan.country })} // Corrected to 'explore'
            />
          </View>
        ))
      ) : (
        <Text>No plans added yet.</Text>
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
  planContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
});
