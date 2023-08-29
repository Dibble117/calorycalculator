import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalorieCalculator from './Calculator'; // Make sure to adjust the import path

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CalorieCalculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
