import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

export default class PersonListItem extends React.Component {
  handlePress = () => {
    this.props.onPress();
  };

  render() {
    const { avatar, firstName, lastName, age } = this.props;

    return (
      <TouchableHighlight onPress={this.handlePress} underlayColor="hotpink">
        <View style={[styles.personItem]}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.age}>{age.toFixed(0)} years</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    height: 80
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginEnd: 16
  },
  age: {
    fontSize: 15,
    paddingTop: 4,
    color: '#888'
  },
  name: {
    fontSize: 15,
    fontWeight: '600'
  },
  old: {
    backgroundColor: '#ccc'
  }
});
