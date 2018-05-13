import { createStackNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from './home-screen';
import Exercises from './exercises';
import SingleExercise from './single-exercise';
import Training from './training';

export default {
  navigateAction: (routeName, params) => NavigationActions.navigate({ routeName, params })
}

export const RootStack = createStackNavigator(
  {

    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Muscle groups',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right',
        }
      }
    },

    Exercises: { 
      screen: Exercises,
      navigationOptions: {
        title: 'Exercises',
        headerTitleStyle: {
          flex: 1,
          textAlign: 'right'
        },
      }
    },

    SingleExercise: {
      screen: SingleExercise,
      navigationOptions: {
        title: 'Exercise name',
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