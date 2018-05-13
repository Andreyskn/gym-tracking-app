import React, { Component } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';

export default class HomeScreen extends Component {
  muscleGroups = [
    'Shoulders',
    'Chest',
    'Back',
    'Arms',
    'Legs',
    'Abs'
  ];

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        {this.muscleGroups.map((group, index) =>
          <View key={index} style={{ marginTop: 10, marginBottom: 10 }} >
            <Button
              title={group}
              buttonStyle={Styles.buttonStyle}
              onPress={() =>
                this.props.navigation.dispatch(Router.navigateAction('Exercises', { group }))
              }
            />
          </View>
        )}
      </View>
    );
  }
}
