import React, { Component } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class ExerciseInput extends Component {
  render() {
    return (
      <View style={{
        flexDirection: 'row',
        paddingLeft: 15,
        marginBottom: 10,
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
          onChangeText={(text) => this.exercise = text}
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
            onPress={(value) => this.exercise ? this.props.onSave(this.exercise) : null}
          />
          <Button
            raised
            icon={{ name: 'close' }}
            buttonStyle={{
              backgroundColor: "red",
              height: 30
            }}
            onPress={this.props.hideInput}
          />
        </View>
      </View>
    )
  }
}