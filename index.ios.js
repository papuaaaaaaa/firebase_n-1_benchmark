/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: 'AIzaSyBbo3r6Aaa5qrIat7-yMIoLEAtqpIZw1ec',
  authDomain: 'firebook-book.firebaseapp.com',
  databaseURL: 'https://book-book-d6d29.firebaseio.com',
})

export default class FirebaseSamples extends Component {

  state = {state: 'fetching'}

  render() {
    firebase.database().ref('data').set('aaa').then(() => {
      this.setState({state: 'complete'})
    }).catch(e => {
      this.setState({state: e.message})
    })

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.state}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FirebaseSamples', () => FirebaseSamples);
