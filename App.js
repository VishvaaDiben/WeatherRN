import {Icon, StatusBar} from 'react-native';

import Details from './screens/Details';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Page = createStackNavigator();
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Page.Navigator>
          <Page.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Page.Screen
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#DDE1E3',
                shadowOpacity: 5,
              },
            }}
            name="Details"
            component={Details}
          />
        </Page.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
