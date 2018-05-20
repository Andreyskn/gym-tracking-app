import React, { Component } from 'react';
import { AsyncStorage, View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';

export default class SingleExercise extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.exercise : 'Exercise name',
    }
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const group = navigation.getParam('group', 'no-data');
    const exercise = navigation.getParam('exercise', 'no-data');

    this.state = {
      trainings: [],
      storageKey: `${group}_${exercise}`,
      exerciseName: exercise,
      group,
    };
  }

  componentWillMount() {
    this.loadTrainings();
  }

  updateTrainingState = (value) => {
    this.setState({
      trainings: [...this.state.trainings, value]
    })
  }

  loadTrainings = async () => {
    try {
      const response = await AsyncStorage.getItem(this.state.storageKey);

      if (response !== null) {
        const trainings = JSON.parse(response);
        this.setState({ trainings });
      }
    } catch (e) {
      console.error('Failed to load. ' + e);
    }
  }

  getDateDiff(entry) {
    const entryDate = new Date(entry.id);
    const now = Date.now();
    const entryDay = entryDate.getDate();
    const today = new Date().getDate();
    const diff = (now - entryDate) / (1000 * 3600);
    const ceiledDiff = Math.ceil(diff);
    const diffMinute = Math.ceil(diff * 60);

    if (diffMinute < 60) {
      return diffMinute > 1 ? `${diffMinute} minutes ago` : 'Just now';
    } else if (diff < 24 && entryDay === today) {
      return `${ceiledDiff} ${ceiledDiff > 1 ? 'hours' : 'hour'} ago`;
    } else if (diff < 24 && entryDay !== today) {
      return `1 day ago`;
    }

    return `${Math.ceil(diff / 24)} days ago`;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View style={{ alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderStyle: 'solid', borderColor: 'black', }}>
            <Text>
              Exercise log
            </Text>
          </View>
          <ScrollView>
            {this.state.trainings.map((training, index) =>
              <View key={training.id} style={{ borderBottomWidth: 1, borderStyle: 'solid', borderColor: 'black', padding: 10 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: 'green' }}>
                    {this.getDateDiff(training)}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text>
                      Sets
                    </Text>
                    <Text>
                      {training.data.length}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>
                      Reps
                    </Text>
                    <Text>
                      {training.data.map(el => el.reps).join(' - ')}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>
                      Max weight
                    </Text>
                    <Text>
                      {Math.max(...training.data.map(el => el.weight))}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={{
          marginTop: 10,
          marginBottom: 20
        }} >
          <Button
            title="Start new training"
            buttonStyle={{}}
            onPress={() => 
              this.props.navigation.dispatch(Router.navigateAction('Training', { 
                storageKey: this.state.storageKey, 
                updateStateFunc: this.updateTrainingState,
                dateDiffFunc: this.getDateDiff,
              }))
            }
          />
        </View>
      </View>
    );
  }
}