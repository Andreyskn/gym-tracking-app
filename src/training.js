import React, { Component } from 'react';
import { AsyncStorage, View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';

export default class Training extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const storageKey = navigation.getParam('storageKey', 'no-data');
    const updateStateFunc = navigation.getParam('updateStateFunc', 'no-data');

    this.state = {
      sets: [{}],
      storageKey,
      updateStateFunc,
      lastTraining: null,
    };
  }

  componentWillMount() {
    this.loadLastTraining();
  }

  loadLastTraining = async () => {
    try {
      const response = await AsyncStorage.getItem(this.state.storageKey);

      if (response !== null) {
        const trainings = JSON.parse(response);
        const lastTraining = trainings[trainings.length - 1];
        this.setState({ lastTraining });
      }
    } catch (e) {
      console.error('Failed to load. ' + e);
    }
  }

  handleInput(text, setId, type) {
    const sets = this.state.sets;
    sets[setId][type] = text;

    this.setState({
      sets
    });
  }

  saveTraining = async () => {
    try {
      const entry = { data: this.state.sets, id: new Date() };
      let data;

      const prevData = await AsyncStorage.getItem(this.state.storageKey);

      if (prevData !== null) {
        data = JSON.parse(prevData);
        data = [...data, entry];
      } else {
        data = [entry];
      }

      await AsyncStorage.setItem(this.state.storageKey, JSON.stringify(data));
      this.state.updateStateFunc(entry);
      this.props.navigation.goBack();
    } catch (e) {
      console.error('Failed to save. ' + e);
    }
  }

  getDateDiff() {
    const entryDate = new Date(this.state.lastTraining.id);
    const now = Date.now();
    const entryDay = entryDate.getDate();
    const today = new Date().getDate();
    const diff = (now - entryDate) / (1000 * 3600);
    const ceiledDiff = Math.ceil(diff);
    const diffMinute = Math.ceil(diff * 60);

    if (diff < 1){
      return `${diffMinute} ${diffMinute > 1 ? 'minutes' : 'minute'} ago`;
    } else if (diff < 24 && entryDay === today) {
      return `${ceiledDiff} ${ceiledDiff > 1 ? 'hours' : 'hour'} ago`;
    } else if (diff < 24 && entryDay !== today) {
      return `1 day ago`;
    }

    return `${Math.ceil(diff / 24)} days ago`;
  }

  render() {
    const lastTraining = this.state.lastTraining;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.lastTraining !== null &&
            <View style={{ 
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderStyle: 'solid',
              borderColor: 'black',
              padding: 10,
            backgroundColor: '#dfdfdf'
            }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ }}>
                Last training - {this.getDateDiff()}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center', flex: .3 }}>
                  <Text>
                    Sets
                  </Text>
                  <Text>
                    {lastTraining.data.length}
                  </Text>
                </View>
                <View style={{ alignItems: 'center', flex: .3 }}>
                  <Text>
                    Reps
                  </Text>
                  <Text>
                    {lastTraining.data.map(el => el.reps).join('-')}
                  </Text>
                </View>
                <View style={{ alignItems: 'center', flex: .3 }}>
                  <Text>
                    Weight
                  </Text>
                  <Text>
                    {lastTraining.data.map(el => el.weight).join('-')}
                  </Text>
                </View>
              </View>
            </View>
          }

          <ScrollView>
            {this.state.sets.map((set, index) =>
              <View key={index} style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderColor: 'black',
                padding: 10,
              }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <View style={{ alignItems: 'center', flex: .3 }}>
                    <Text>
                      Set {index+1}:
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center', height: 60, flex: .3 }}>
                    <Text>
                      Reps
                    </Text>
                      <TextInput
                        style={{
                          borderColor: 'gray',
                          borderWidth: 1,
                          flex: 1,
                          padding: 10,
                          borderRadius: 4,
                          textAlign: 'center',
                          marginTop: 5,
                          height: 30
                        }}
                        keyboardType='phone-pad'
                        onChangeText={(text) => this.handleInput(text, index, 'reps')}
                      />
                  </View>
                  <View style={{ alignItems: 'center', flex: .3 }}>
                    <Text>
                      Weight
                    </Text>
                      <TextInput
                        style={{
                          borderColor: 'gray',
                          borderWidth: 1,
                          flex: 1,
                          padding: 10,
                          borderRadius: 4,
                          textAlign: 'center',
                          marginTop: 5,
                          height: 30
                        }}
                        keyboardType='phone-pad'
                        onChangeText={(text) => this.handleInput(text, index, 'weight')}
                      />
                  </View>
                </View>
              </View>
            )}
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Button
                title="New set"
                buttonStyle={{
                  backgroundColor: "green",
                  width: 100,
                  height: 45,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
                onPress={() => this.setState({ sets: [...this.state.sets, {}] })}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{
          marginTop: 10,
          marginBottom: 20
        }} >
          <Button
            title="Finish training"
            buttonStyle={{}}
            onPress={() => { this.saveTraining() }}
          />
        </View>
      </View>
    );
  }
}