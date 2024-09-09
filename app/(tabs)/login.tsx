import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from '../../firebase'; // Correct the import path

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, navigate to home screen
        navigation.navigate('index');
      }
    });
    return unsubscribe;
  }, []);

  // Handle login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Login Successful', `Welcome ${user.email}`);
        navigation.navigate('index'); // Navigate to home or main screen after login
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Login Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('register')}>
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  registerLink: {
    color: '#0000ff',
    fontWeight: 'bold',
  },
});
