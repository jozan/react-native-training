import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import personService from '../services/personService';
import PersonListItem from '../components/PersonListItem';
import SignOutButton from '../components/SignOutButton';

export default class Main extends Component {
  static navigationOptions = {
    headerRight: <SignOutButton />
  };

  state = {
    persons: []
  };

  async componentDidMount() {
    try {
      const persons = await personService.getPersons();
      this.setState(() => ({ persons }));
    } catch (e) {
      console.error(e.message, e);
    }
  }

  renderPersonItem = ({ item: person }) => {
    return (
      <PersonListItem {...person} onPress={this.handlePersonPress(person)} />
    );
  };

  handlePersonPress = person => () => {
    this.props.navigation.navigate('Person', { person });
  };

  extractKey = person => person.id;

  getItemLayout = (data, index) => ({
    length: 80 + StyleSheet.hairlineWidth,
    offset: (80 + StyleSheet.hairlineWidth) * index,
    index
  });

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={[styles.container]}>
        <FlatList
          style={styles.personsList}
          data={this.state.persons}
          renderItem={this.renderPersonItem}
          keyExtractor={this.extractKey}
          getItemLayout={this.getItemLayout}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  personsList: {
    flex: 1
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbb'
  }
});
