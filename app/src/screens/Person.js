import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  Animated,
  InteractionManager
} from 'react-native';
import Draggable from '../components/Draggable';
const { width: screenWidth } = Dimensions.get('window');

export default class Person extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.person.firstName} ${
      navigation.state.params.person.lastName
    }`
  });

  state = {
    report: '',
    isLoading: true
  };

  animatedOpacity = new Animated.Value(0);
  animatedText = new Animated.Value(0);

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState(() => ({
        isLoading: false
      }));
    });
  }

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
        Animated.timing(this.animatedText, {
          toValue: 0,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedOpacity, {
          toValue: 0,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  handleDropzone = report => () => {
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
          {!this.state.isLoading && (
            <Image source={{ uri: person.avatar }} style={styles.avatar} />
          )}

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
        <View style={styles.draggables}>
          <Draggable onDropzone={this.handleDropzone('Comrade')}>
            <Text style={styles.draggableText}>Comrade</Text>
          </Draggable>
          <Draggable onDropzone={this.handleDropzone('Suspicious')}>
            <Text style={styles.draggableText}>Suspicious</Text>
          </Draggable>
          <Draggable onDropzone={this.handleDropzone('Traitor')}>
            <Text style={styles.draggableText}>Traitor</Text>
          </Draggable>
        </View>
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
  },

  draggables: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  draggableText: {
    padding: 16,
    backgroundColor: 'tomato',
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  }
});
