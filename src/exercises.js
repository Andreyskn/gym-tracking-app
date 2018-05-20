import React, { Component } from 'react';
import { AsyncStorage, View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';
import ExerciseInput from './ui/input';
import OptionsButton from './ui/optionsButton';

export default class Exercises extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.group : 'Exercises',
    }
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const group = navigation.getParam('group', 'no-data');

    this.state = {
      showInput: false,
      exercises: [],
      storageKey: group,
      showOptions: false,
    };
  }

  componentWillMount() {
    this.loadExercises();
  }

  toggleOptions = (forEntry) => {
    this.state.showOptions === forEntry ?
      this.setState({ showOptions: false })
    :
      this.setState({ showOptions: forEntry })
  }

  showInput = () => {
    this.setState({
      showInput: true,
      showOptions: false
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
        showInput: false,
      });
    } catch (e) {
      console.error('Failed to save. ' + e);
    }
  }

  deleteExercise = async (value) => {
    try {
      const exercises = [...this.state.exercises].filter(ex => ex !== value);
      const trainingsKey = `${this.state.storageKey}_${value}`;

      await AsyncStorage.setItem(this.state.storageKey, JSON.stringify(exercises));
      await AsyncStorage.removeItem(trainingsKey);

      this.setState({
        exercises,
        showOptions: false,
      });
    } catch (e) {
      console.error('Failed to save. ' + e);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }} >
        {this.state.showInput && <ExerciseInput hideInput={this.hideInput} onSave={this.saveExercise} />}
        <ScrollView>
          {this.state.exercises.map((exercise, index) => 
            <View key={index} style={{ marginBottom: 10, justifyContent: 'center', flexDirection: 'row', position: 'relative' }} >
              <Button
                title={exercise}
                buttonStyle={{ ...Styles.buttonStyle, paddingRight: 30}}
                onPress={() => {
                  this.setState({ showOptions: false, showInput: false });
                  this.props.navigation.dispatch(Router.navigateAction('SingleExercise', { group: this.state.storageKey, exercise }));
                }}
              />
              <Button
                buttonStyle={{ 
                  backgroundColor: 'rgba(80, 80,216, 1)',
                  flex: 1,
                  marginLeft: -50,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                  paddingRight: 0
                }}
                onPress={() => { this.toggleOptions(exercise) }}
                icon={{ name: 'kebab-vertical', type: 'octicon', style: { marginRight: 0 } }}
              />
              {this.state.showOptions === exercise && 
                <OptionsButton
                  entry = {exercise}
                  onDelete= {this.deleteExercise}
                  editButton={false}
                />
              }
            </View>
          )}
        </ScrollView>
       
        <View style={{
          marginTop: 10,
          marginBottom: 20,
        }} >
          <Button
            title="Add new exercise"
            buttonStyle={{}}
            onPress={() => this.showInput()}
          />
        </View>
      </View>
    );
  }
}