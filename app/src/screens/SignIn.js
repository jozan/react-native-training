import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import authService from '../services/authService';

const IS_ANDROID = Platform.OS === 'android';

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleInput = field => text => {
    this.setState(state => ({
      [field]: text
    }));
  };

  handleSignIn = async () => {
    const { username } = this.state;
    if (username.length > 0) {
      await authService.auth({ username });
      this.props.navigation.navigate('Tabs');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled={!IS_ANDROID}
        behavior="padding"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Fraktio Stasi</Text>
          <View>
            <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={this.handleInput('username')}
              placeholder="Username"
              autoCapitalize="none"
            />
            <TextInput
              ref={this.intputRef}
              style={styles.input}
              value={this.state.password}
              onChangeText={this.handleInput('password')}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <RectButton
            style={styles.button}
            onPress={this.handleSignIn}
            // disabled={this.state.username.length < 1}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </RectButton>
        </View>
      </KeyboardAvoidingView>
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
  },
  button: {
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        backgroundColor: 'tomato'
      },
      android: {
        backgroundColor: '#E46F0A'
      },
      default: {}
    })
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  },
  input: {
    width: 300,
    fontSize: 18,
    padding: 16,
    borderBottomColor: '#c5c5c5',
    borderBottomWidth: 2
  }
});
