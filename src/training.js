import React, { Component } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './styles';
import Router from './router';

export default class Training extends Component {
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