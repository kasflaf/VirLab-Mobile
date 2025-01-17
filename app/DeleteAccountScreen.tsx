import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function DeleteAccountScreen() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleDeleteAccount = () => {
    // In a real app, you would verify the password and delete the account here
    Alert.alert(
      "Confirm Account Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            // Perform account deletion logic here
            console.log("Account deleted");
            router.push('/' as any);
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.warning}>Warning: This action cannot be undone.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password to confirm"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete My Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  warning: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#4a90e2',
    fontSize: 16,
  },
});

