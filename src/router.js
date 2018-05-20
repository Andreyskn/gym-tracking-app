import { createStackNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from './home-screen';
import Exercises from './exercises';
import SingleExercise from './single-exercise';
import Training from './training';

export default {
  navigateAction: (routeName, params) => NavigationActions.navigate({ routeName, params }),
  pushAction: (routeName, params) => NavigationActions.push({ routeName, params }),
}

export const RootStack = createStackNavigator(
  {

    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Gym Tracker',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
        }
      }
    },

    Exercises: { 
      screen: Exercises,
      navigationOptions: {
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right'
        },
      }
    },

    SingleExercise: {
      screen: SingleExercise,
      navigationOptions: {
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right'
        },
      }
    },

    Training: {
      screen: Training,
      navigationOptions: {
        title: 'New training',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right'
        },
      }
    },

  },
  { 
    headerMode: 'float',
  }
);