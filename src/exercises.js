import React, { Component } from 'react';
import { AsyncStorage, View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';
import ExerciseInput from './ui/input';

export default class Exercises extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const group = navigation.getParam('group', 'no-data');

    this.state = {
      showInput: false,
      exercises: [],
      storageKey: group,
    };
  }

  componentWillMount() {
    this.loadExercises();
  }

  showInput = () => {
    this.setState({
      showInput: true
    })
  }

  hideInput = () => {
    this.setState({
      showInput: false
    })
  }

  loadExercises = async () => {
    try {
      const response = await AsyncStorage.getItem(this.state.storageKey);

      if (response !== null) {
        const exercises = JSON.parse(response);
        this.setState({exercises});
      }
    } catch (e) {
      console.error('Failed to load. ' + e);
    }
  }

  saveExercise = async (value) => {
    try {
      const exercises = [...this.state.exercises, value];

      await AsyncStorage.setItem(this.state.storageKey, JSON.stringify(exercises));

      this.setState({
        exercises,
        showInput: false
      });
    } catch (e) {
      console.error('Failed to save. ' + e);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }} >
        <ScrollView>
          {this.state.showInput && <ExerciseInput hideInput={this.hideInput} onSave={this.saveExercise} />}

          {this.state.exercises.map((exercise, index) => 
            <View key={index} style={{ marginBottom: 10, alignItems: 'center' }} >
              <Button
                title={exercise}
                buttonStyle={Styles.buttonStyle}
                onPress={() => 
                  this.props.navigation.dispatch(Router.navigateAction('SingleExercise'))
                }
              />
            </View>
          )}
          

        </ScrollView>
       
        <View style={{
          marginTop: 10,
          marginBottom: 20
        }} >
          <Button
            title="Add new exercise"
            buttonStyle={{

            }}
            onPress={this.showInput}
          />
        </View>
      </View>
    );
  }
}