import React, { Component } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class OptionsButton extends Component {
  render() {
    const entry = this.props.entry;
    const editBtn = this.props.editButton;
    const training = this.props.training;

    return (
        <View style={{
          position: 'absolute',
          top: '50%',
          right: (training ? 55 : 70),
          backgroundColor: '#ffffff',
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          transform: [{ translateY: (training ? -30 : -25) }]
        }} >
          {editBtn &&
            <Button
              buttonStyle={{
                width: 50,
                height: 50,
                backgroundColor: 'rgba(70, 70,250, 1)',
                borderColor: '#ffffff',
                borderWidth: 1,
              }}
              containerViewStyle={{
                marginRight: 0,
                marginLeft: 0
              }}
              onPress={() => { }}
              icon={{ name: 'edit', size: 24, style: { marginRight: 0 } }}
            />
          }
          <Button
            buttonStyle={{
              width: (training ? 60 : 50),
              height: (training ? 60 : 50),
              backgroundColor: 'rgba(70, 70,250, 1)',
              borderColor: '#ffffff',
              borderWidth: 1,
            }}
            containerViewStyle={{
              marginRight: 0,
              marginLeft: 0
            }}
            onPress={() => this.props.onDelete(entry)}
            icon={{ name: 'delete-forever', size: 24, style: { marginRight: 0 } }}
          />
        </View>
    )
  }
}