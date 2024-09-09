// Register.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../../firebase';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Registration Successful', `Welcome ${user.email}`);
        navigation.navigate('login'); // Navigate back to the login screen
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Registration Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <Button title="Register" onPress={handleRegister} />

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('login')}>
          Login
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
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  loginLink: {
    color: '#0000ff',
    fontWeight: 'bold',
  },
});
