import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignUpScreen: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text>Sign Up Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
