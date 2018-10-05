import React from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default class Draggable extends React.Component {
  translateX = new Animated.Value(0);
  translateY = new Animated.Value(0);
  lastOffset = { x: 0, y: 0 };

  handleGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY
        }
      }
    ],
    {
      useNativeDriver: true
    }
  );

  handleStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { nativeEvent } = event;
      this.lastOffset.x += nativeEvent.translationX;
      this.lastOffset.y += nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateX.setValue(0);
      this.translateY.setValue(0);
    }
  };

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.handleGestureEvent}
        onHandlerStateChange={this.handleStateChange}
      >
        <Animated.View
          style={{
            transform: [
              { translateX: this.translateX },
              { translateY: this.translateY }
            ]
          }}
        >
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
