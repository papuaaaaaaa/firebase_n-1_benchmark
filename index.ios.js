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
  View,
  TouchableOpacity,
} from 'react-native';
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: 'AIzaSyBbo3r6Aaa5qrIat7-yMIoLEAtqpIZw1ec',
  authDomain: 'firebook-book.firebaseapp.com',
  databaseURL: 'https://book-book-d6d29.firebaseio.com',
})

export default class FirebaseSamples extends Component {

  state = {state: 'fetching'}

  withNormalize = () => {
    firebase.database().ref('actions').remove()
    firebase.database().ref('users').remove()
    firebase.database().ref('books').remove()
    const count = 10000
    Array(count).fill(0).map((_,i)=>i+1).map(i => {
      firebase.database().ref('actions').child(i).set({
        id: i,
        userId: i,
        bookId: i,
        actionData: i + 'action12345678901234567890123456789012345678901234567890',
      })
      firebase.database().ref('users').child(i).set({
        id: i,
        userData: i + 'user12345678901234567890123456789012345678901234567890',
      })
      firebase.database().ref('books').child(i).set({
        id: i,
        bookData: i + 'book12345678901234567890123456789012345678901234567890',
      })
    })
    var t0 = performance.now();
    return Promise.all(Array(count).fill(0).map((_,i)=>i+1).map(i => {
      return firebase.database().ref('actions').child(i).once('value').then(a => {
        return firebase.database().ref('users').child(a.val().userId).once('value').then(u => {
          return firebase.database().ref('books').child(a.val().bookId).once('value').then(b => {
            return {
              id: i,
              actionData: a.val().actionData,
              userData: u.val().userData,
              bookData: b.val().bookData,
            }
          })
        })
      })
    })).then(v => {
      var t1 = performance.now();
      console.log("withNormalize took " + (t1 - t0) + " milliseconds.")
      return v
    })
  }

  withUnNormalize = () => {
    firebase.database().ref('actions').remove()
    firebase.database().ref('users').remove()
    firebase.database().ref('books').remove()
    const count = 1000
    Array(count).fill(0).map((_,i)=>i+1).map(i => {
      firebase.database().ref('actions').child(i).set({
        id: i,
        userData: i + 'user12345678901234567890123456789012345678901234567890',
        bookData: i + 'book12345678901234567890123456789012345678901234567890',
        actionData: i + 'action12345678901234567890123456789012345678901234567890',
      })
    })
    var t0 = performance.now();
    return Promise.all(Array(count).fill(0).map((_,i)=>i+1).map(i => {
      return firebase.database().ref('actions').child(i).once('value').then(a => {
        return {
          id: i,
          actionData: a.val().actionData,
          userData: a.val().userData,
          bookData: a.val().bookData,
        }
      })
    })).then(v => {
      var t1 = performance.now();
      console.log("withUnNormalize took " + (t1 - t0) + " milliseconds.")
      return v
    })
  }

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
        <TouchableOpacity onPress={this.withNormalize}>
          <Text style={styles.instructions}>
            withNormalize
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.withUnNormalize}>
          <Text style={styles.instructions}>
            withUnNormalize
          </Text>
        </TouchableOpacity>
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
