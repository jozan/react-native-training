import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import authService from '../services/authService';

class SignOutButton extends React.Component {
  handleSignOut = async () => {
    await authService.signOut();
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <RectButton
        style={styles.container}
        onPress={this.handleSignOut}
        hitSlop={{ top: 24, left: 24, bottom: 24, right: 24 }}
      >
        <View style={styles.button} />
      </RectButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginEnd: 16,
    borderRadius: 24 / 2
  },
  button: {
    height: 24,
    width: 24,
    backgroundColor: 'tomato'
  }
});

export default withNavigation(SignOutButton);
