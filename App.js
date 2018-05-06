import React from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { createStackNavigator, NavigationActions } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ marginTop: 10, marginBottom: 10 }} >
          <Button
            title="Shoulders"
            buttonStyle={buttonStyle}
            onPress={() =>
              this.props.navigation.dispatch(navigateAction('Exercises'))
            }
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }} >
          <Button
            title="Chest"
            buttonStyle={buttonStyle}
            onPress={() =>
              this.props.navigation.dispatch(navigateAction('Exercises'))
            }
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }} >
          <Button
            title="Back"
            buttonStyle={buttonStyle}
            onPress={() =>
              this.props.navigation.dispatch(navigateAction('Exercises'))
            }
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }} >
          <Button
            title="Arms"
            buttonStyle={buttonStyle}
            onPress={() =>
              this.props.navigation.dispatch(navigateAction('Exercises'))
            }
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }} >
          <Button
            title="Legs"
            buttonStyle={buttonStyle}
            onPress={() =>
              this.props.navigation.dispatch(navigateAction('Exercises'))
            }
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }} >
          <Button
            title="Abs"
            buttonStyle={buttonStyle}
            onPress={() =>
              this.props.navigation.dispatch(navigateAction('Exercises'))
            }
          />
        </View>
      </View>
    );
  }
}

class Exercises extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }} >
        <ScrollView>
          <View style={{ marginBottom: 10, alignItems: 'center' }} >
            <Button
              title="Button with exercise name"
              buttonStyle={buttonStyle}
              onPress={() => 
                this.props.navigation.dispatch(navigateAction('SingleExercise'))
              }
            />
          </View>

          <View style={{
            flexDirection: 'row',
            paddingLeft: 15,
            marginTop: 10,
            alignItems: 'center'
          }} >
            <TextInput
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                flex: 1,
                padding: 10,
                borderRadius: 4,
              }}
              placeholder='Enter exercise name'
              autoCorrect={false}
              multiline
            />
            <View style={{
              height: 90,
              justifyContent: 'space-around'
            }} >
              <Button
                raised
                icon={{ name: 'check' }}
                buttonStyle={{
                  backgroundColor: "green",
                  height: 30
                }}
              />
              <Button
                raised
                icon={{ name: 'close' }}
                buttonStyle={{
                  backgroundColor: "red",
                  height: 30
                }}
              />
            </View>
          </View>
        </ScrollView>
       
        <View style={{
          marginTop: 10,
          marginBottom: 20
        }} >
          <Button
            title="Add new exercise"
            buttonStyle={{

            }}
            onPress={() => { }}
          />
        </View>
      </View>
    );
  }
}

class SingleExercise extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Text>
              Last Exercises
            </Text>
          </View>
          <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderStyle: 'solid', borderColor: 'black', padding: 10 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: 'red' }}>
                3 days ago
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center' }}>
                <Text>
                  Sets
                </Text>
                <Text>
                  3
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text>
                  Reps
                </Text>
                <Text>
                  10-10-8
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text>
                  Max weight
                </Text>
                <Text>
                  20
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button
            title="Start new training"
            buttonStyle={{
              marginBottom: 20
            }}
            onPress={() => 
              this.props.navigation.dispatch(navigateAction('Training'))
            }
          />
        </View>
      </View>
    );
  }
}

class Training extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ 
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: 'black',
            padding: 10,
          }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ }}>
                Last training - 3 days ago
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center', flex: .3 }}>
                <Text>
                  Sets
                </Text>
                <Text>
                  3
                </Text>
              </View>
              <View style={{ alignItems: 'center', flex: .3 }}>
                <Text>
                  Reps
                </Text>
                <Text>
                  10-10-8
                </Text>
              </View>
              <View style={{ alignItems: 'center', flex: .3 }}>
                <Text>
                  Max weight
                </Text>
                <Text>
                  20
                </Text>
              </View>
            </View>
          </View>
          <View style={{
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: 'black',
            padding: 10,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', flex: .3 }}>
                <Text>
                  Set 1:
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
                    marginTop: 5
                  }}
                  keyboardType='numeric'
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
                    marginTop: 5
                  }}
                  keyboardType='numeric'
                />
              </View>
            </View>
          </View>
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
              onPress={() => { }}
            />
          </View>
        </View>
        <View>
          <Button
            title="Finish training"
            buttonStyle={{
              marginBottom: 20
            }}
            onPress={() => { }}
          />
        </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {

    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Muscle groups',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right',
        }
      }
    },

    Exercises: { 
      screen: Exercises,
      navigationOptions: {
        title: 'Exercises',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right'
        },
      }
    },

    SingleExercise: {
      screen: SingleExercise,
      navigationOptions: {
        title: 'Exercise name',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right'
        },
      }
    },

    Training: {
      screen: Training,
      navigationOptions: {
        title: 'New training',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right'
        },
      }
    },

  },
  { 
    headerMode: 'float',
  }
);

const navigateAction = (routeName) => NavigationActions.navigate(
  {routeName}
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const buttonStyle = {
  backgroundColor: "rgba(92, 99,216, 1)",
  width: 300,
  height: 45,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 5
}
