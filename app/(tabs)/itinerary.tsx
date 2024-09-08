import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { db, collection, getDocs } from '../../firebase';

export default function Itinerary() {
  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const querySnapshot = await getDocs(collection(db, 'travelPlans'));
      const plans = querySnapshot.docs.map(doc => doc.data());
      setTravelPlans(plans);
    };
    fetchPlans();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {travelPlans.length > 0 ? (
        travelPlans.map((plan, index) => (
          <View key={index} style={styles.planItem}>
            <Text style={styles.planText}>Destination: {plan.destination}</Text>
            <Text>Date: {plan.date}</Text>
            <Text>Notes: {plan.notes}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noPlansText}>No travel plans saved.</Text>
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
  planItem: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  planText: {
    fontSize: 16,
  },
  noPlansText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});
