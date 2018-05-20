import React, { Component } from 'react';
import { AsyncStorage, View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';
import OptionsButton from './ui/optionsButton';

export default class Training extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const storageKey = navigation.getParam('storageKey', 'no-data');
    const updateStateFunc = navigation.getParam('updateStateFunc', 'no-data');

    this.getDateDiff = navigation.getParam('dateDiffFunc', 'no-data');

    this.state = {
      sets: [{ id: Date.now() }],
      storageKey,
      updateStateFunc,
      lastTraining: null,
      showOptions: false
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
    sets.map(set => set.id === setId ? set[type] = text : null);

    this.setState({
      sets
    });
  }

  toggleOptions = (forEntry) => {
    this.state.showOptions === forEntry ?
      this.setState({ showOptions: false })
      :
      this.setState({ showOptions: forEntry })
  }

  deleteSet = (setId) => {
    const sets = this.state.sets.filter((set) => set.id !== setId);

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

  render() {
    const lastTraining = this.state.lastTraining;

    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          borderTopWidth: 1,
          borderStyle: 'solid',
          borderColor: 'black',
        }}>
          {this.state.lastTraining !== null &&
            <View style={{ 
              borderBottomWidth: 1,
              borderStyle: 'solid',
              borderColor: 'black',
              padding: 10,
              backgroundColor: '#dfdfdf'
            }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ }}>
                Last training - {this.getDateDiff(lastTraining)}
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
                    {lastTraining.data.map(el => el.reps).join(' - ')}
                  </Text>
                </View>
                <View style={{ alignItems: 'center', flex: .3 }}>
                  <Text>
                    Weight
                  </Text>
                  <Text>
                    {lastTraining.data.map(el => el.weight).join(' - ')}
                  </Text>
                </View>
              </View>
            </View>
          }

          <ScrollView contentContainerStyle={{paddingBottom: 200}}>
            {this.state.sets.map((set, index) =>
              <View key={set.id} style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderColor: 'black',
                paddingTop: 10,
                paddingBottom: 10,
              }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ alignItems: 'center', flex: .25 }}>
                    <Text>
                      Set {index+1}:
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center', height: 60, flex: .25 }}>
                    <Text>
                      Reps
                    </Text>
                      <TextInput
                        style={{
                          flex: 1,
                          padding: 10,
                          textAlign: 'center',
                          marginTop: 5,
                          height: 30
                        }}
                        keyboardType='phone-pad'
                        onChangeText={(text) => this.handleInput(text, set.id, 'reps')}
                        onFocus={() => this.setState({ showOptions: false })}
                      />
                  </View>
                  <View style={{ alignItems: 'center', flex: .25 }}>
                    <Text>
                      Weight
                    </Text>
                      <TextInput
                        style={{
                          flex: 1,
                          padding: 10,
                          textAlign: 'center',
                          marginTop: 5,
                          height: 30
                        }}
                        keyboardType='phone-pad'
                        onChangeText={(text) => this.handleInput(text, set.id, 'weight')}
                        onFocus={() => this.setState({ showOptions: false })}
                      />
                  </View>
                  <Button
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      flex: .2,
                      paddingRight: 0,
                    }}
                    onPress={() => { this.toggleOptions(set.id) }}
                    icon={{ name: 'kebab-vertical', type: 'octicon', style: { marginRight: 0, color: 'black' } }}
                  />
                  {this.state.showOptions === set.id &&
                    <OptionsButton
                      entry={set.id}
                      onDelete={this.deleteSet}
                      training = {true}
                    />
                  }
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
                onPress={() => {
                  this.setState({
                    sets: [...this.state.sets, { id: Date.now() }],
                    showOptions: false
                  })
                }}
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