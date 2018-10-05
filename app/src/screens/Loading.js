import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import authService from '../services/authService';

export default class Loading extends React.Component {
  async componentDidMount() {
    setTimeout(async () => {
      const isAuthed = await authService.isAuthed();
      if (isAuthed) {
        this.props.navigation.navigate('Tabs');
      } else {
        this.props.navigation.navigate('SignIn');
      }
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
