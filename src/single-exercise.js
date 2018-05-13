import React, { Component } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';

export default class SingleExercise extends Component {
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
              this.props.navigation.dispatch(Router.navigateAction('Training'))
            }
          />
        </View>
      </View>
    );
  }
}