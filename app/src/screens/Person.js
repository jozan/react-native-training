import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  Animated
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default class Person extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.person.firstName} ${
      navigation.state.params.person.lastName
    }`
  });

  state = {
    report: ''
  };

  animatedOpacity = new Animated.Value(0);
  animatedText = new Animated.Value(0);

  animate = toValue => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.animatedOpacity, {
          toValue,
          useNativeDriver: true
        }),
        Animated.spring(this.animatedText, {
          toValue,
          stiffness: 100,
          damping: 10,
          mass: 3,
          useNativeDriver: true
        })
      ]),
      Animated.delay(3000),
      Animated.stagger(200, [
        Animated.timing(this.animatedOpacity, {
          toValue: 0,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedText, {
          toValue: 0,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  handleReportPress = report => () => {
    this.animate(1);

    this.setState(() => ({
      report
    }));
  };

  render() {
    const person = this.props.navigation.getParam('person', {});

    const rotate = this.animatedText.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View>
        <View>
          <Image source={{ uri: person.avatar }} style={styles.avatar} />
          <Animated.View
            style={[styles.overlay, { opacity: this.animatedOpacity }]}
          >
            <Animated.Text
              style={[
                styles.reportText,
                {
                  transform: [{ scale: this.animatedText }, { rotate }]
                }
              ]}
            >
              {this.state.report}
            </Animated.Text>
          </Animated.View>
        </View>
        <View>
          <Text>{person.firstName}</Text>
          <Text>{person.lastName}</Text>
        </View>
        <Button title="Comrade" onPress={this.handleReportPress('Comrade')} />
        <Button
          title="Suspicious"
          onPress={this.handleReportPress('Suspicious')}
        />
        <Button title="Traitor" onPress={this.handleReportPress('Traitor')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: screenWidth,
    height: screenWidth
  },
  overlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato'
  },
  reportText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 4,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    textShadowColor: 'rgba(0,0,0,0.15)'
  }
});
