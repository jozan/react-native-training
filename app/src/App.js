import React, { Component } from 'react';
import { View, Text } from 'react-native';
import personService from './services/personService';

export default class App extends Component {
  state = {
    isReady: undefined
  };

  async componentDidMount() {
    try {
      await personService.getPersons();
      this.setState(() => ({ isReady: true }));
    } catch (e) {
      console.warn(e.message, e);
      this.setState(() => ({ isReady: false }));
    }
  }

  getIsReady = () => {
    switch (this.state.isReady) {
      case undefined:
        return 'loading...';
      case true:
        return "You're ready!";
      default:
        return "Make sure you've got .env file and the server running. Check README for details.";
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#bada55'
        }}
      >
        <Text>React Native Training</Text>
        <Text>{this.getIsReady()}</Text>
      </View>
    );
  }
}
