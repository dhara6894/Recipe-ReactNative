import LoginComponent from './components/LoginComponent';
import RecipeListComponent from './components/RecipeListComponent';
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// function LoginScreen({navigation,route}) {
//   navigation.setOptions({
//     headerMode: 'none',
//         headerShown: false
//   });
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//          <LoginComponent></LoginComponent>
//     </View>
//   );
// }

// function RecipeListScreen({navigation,route}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <RecipeListComponent></RecipeListComponent>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="RecipeList" component={RecipeListScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


const AppStack = createStackNavigator(
  {
  RecipeList: {
    screen: RecipeListComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'RecipeList',
      headerLeft: null,
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: 'white',
      headerTitleStyle:  {
        fontSize: 18,
        fontWeight: 'bold',
      }
    }),
  },
  Login: {
    screen: LoginComponent,
    header: null,
    headerMode: 'none'
  }
  },
  {
    initialRouteName: 'Login',
 
  }
  );

export default createAppContainer(AppStack);
