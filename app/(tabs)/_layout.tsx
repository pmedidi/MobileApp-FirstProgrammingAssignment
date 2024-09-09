import React, { useEffect, useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, AppState } from 'react-native';
import { onAuthStateChanged, signOut, auth } from '../../firebase'; // Adjust path to firebase
import { useNavigation } from '@react-navigation/native';

import Index from './index';
import AddPlan from './add-plan';
import Explore from './explore';
import Itinerary from './itinerary';
import Login from './login';
import Register from './registration';

const Stack = createNativeStackNavigator();
const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function Layout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();

  useEffect(() => {
    // Force log out the user upon app start to ensure they have to log in every time
    signOut(auth)
      .then(() => {
        console.log('User signed out on app start');
        setUser(null);
        // Use reset to clear the stack and avoid back button
        navigation.reset({
          index: 0,
          routes: [{ name: 'login' }],
        });
      })
      .catch((error) => {
        console.error("Error signing out on app start:", error);
      });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        startInactivityTimer(); // Start the timer when the user logs in
      } else {
        setUser(null);
        clearInactivityTimer(); // Clear the timer if logged out
        navigation.reset({
          index: 0,
          routes: [{ name: 'login' }],
        }); // Ensure user is navigated to login if no user
      }
      setLoading(false);
    });

    // Listen to app state changes (background/foreground)
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      unsubscribe();
      subscription.remove();
      clearInactivityTimer();
    };
  }, [navigation]);

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      // App became active, restart the inactivity timer
      startInactivityTimer();
    }
    appState.current = nextAppState;
  };

  const startInactivityTimer = () => {
    clearInactivityTimer(); // Clear the previous timer
    timeoutRef.current = setTimeout(() => {
      handleLogout(); // Auto log out after 5 minutes
    }, INACTIVITY_LIMIT);
  };

  const clearInactivityTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigation.reset({
          index: 0,
          routes: [{ name: 'login' }],
        }); // Reset stack on logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={user ? 'index' : 'login'}>
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: 'Login',
          headerLeft: () => null, // Disable back button on login screen
          gestureEnabled: false,  // Disable swipe back gesture on iOS
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: 'Register',
          headerLeft: () => null, // Disable back button on registration screen
          gestureEnabled: false,  // Disable swipe back gesture on iOS
        }}
      />
      <Stack.Screen
        name="index"
        component={Index}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="add-plan"
        component={AddPlan}
        options={{ title: 'Add Travel Plan' }}
      />
      <Stack.Screen
        name="itinerary"
        component={Itinerary}
        options={{ title: 'Your Itinerary' }}
      />
      <Stack.Screen
        name="explore"
        component={Explore}
        options={{ title: 'Explore Attractions' }}
      />
    </Stack.Navigator>
  );
}
