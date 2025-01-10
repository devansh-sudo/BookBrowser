import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { BookProvider } from './src/context/BookContext';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import FilterScreen from './src/screens/FilterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <BookProvider>
      <StatusBar
        backgroundColor="#f4511e"
        barStyle="light-content"
      />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#fff',
            },
          }}
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Book Browser',
            }}
          />
          <Stack.Screen 
            name="BookDetail" 
            component={BookDetailScreen}
            options={{
              title: 'Book Details',
            }}
          />
          <Stack.Screen 
            name="Filter" 
            component={FilterScreen}
            options={{
              title: 'Filter Books',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
};

export default App;