import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import authService from '../services/authService';
import SignOutButton from '../components/SignOutButton';

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <SignOutButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    color: '#444',
    fontSize: 38,
    fontWeight: '300'
  }
});
