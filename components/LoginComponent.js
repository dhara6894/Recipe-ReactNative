
import React, { Component } from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, ImageBackground, ActivityIndicator } from 'react-native';
import t from 'tcomb-form-native';
import {AsyncStorage} from 'react-native';

const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  password: t.String,
});

 class LoginComponent extends Component {
  static navigationOptions = {
    header: null
}

  constructor() {
    super();
  }
  state = { isLoading: false }

  handleSubmit = async () => {
    
    const value = this._form.getValue();
    if (value) {
        console.log(value);
        this.setState({
            isLoading: true
          });
          this.fetchAPI(value)
    }
  }

  async fetchAPI(param) {
    try {
      const response = await fetch('http://35.160.197.175:3006/api/v1/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'jm1@example.com',//param.email,
          password: 'jay@123'//param.password,
        })
      });
      const responseJson = await response.json();
      console.log("--Api response----");
      this.setState({
        isLoading: false
      });
      console.log(responseJson);
      if (responseJson.statusCode == 400) {
        console.log("-------error-----");
      }
      else {
        console.log("------success------");
        const { navigate } = this.props.navigation;
        AsyncStorage.setItem('token', responseJson.token, () => {
          navigate('RecipeList');
        });
      }
    }
    catch (error) {
      console.error("---error in catch");
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    
    return (

      <ImageBackground source={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/bgimage.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={{
            alignItems: 'center',
            height: 100,
          }}>
            <Text style={styles.black}>Log In</Text>
            <Text style={styles.gray}>Good to see you again!!!</Text>
          </View>
          <View style={styles.MainContainer}>
            <ActivityIndicator style={{
              justifyContent: 'center'
            }} size="large" color="white" animating={this.state.isLoading} />
            <Form
              ref={c => this._form = c}
              type={User}
              options={options}
            />
            <View style={{
              backgroundColor: 'red',
              height: 40
            }} >
              <Button
                title="Login"
                color='white'
                onPress={this.handleSubmit}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'white',
      fontSize: 14,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
  },
  textbox: {
    normal: {
      color: 'white',
      borderWidth: 1,
      height: 35,
      borderRadius: 4,
      borderColor: 'white'
    },
  },
}
const options = {
  fields: {
    email: {
      error: 'Please enter Email',
      keyboardType: 'email-address'
    },
    password: {
      error: 'Please enter Password',
      password: true,
      secureTextEntry: true,
    }
  },
  stylesheet: formStyles,
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 0.4,
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
  },
  black: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gray: {
    color: 'white',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  container: {
    justifyContent: 'center',
    color: 'green',
    flex: 1
  },
  bgImage: {
    flex: 1
  },
  textColor: {
    color: 'white'
  }
});
export default  LoginComponent;