
import { createAppContainer } from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import * as Colors from '../res/colors';
import SimonGame from '../pages/SimonGame';
import Leaderboard from '../pages/Leaderboard';
import Home from '../pages/Home';


const HomeStack = createStackNavigator({
    Home,
    SimonGame,
    Leaderboard,
},

  {
    initialRouteName: 'Home',
    headerLayoutPreset: "center",

    defaultNavigationOptions: {
        headerStyle: {
        backgroundColor: `${Colors.BLUE_NEVIGATION}`,
      }, 
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontSize: 22,
        textAlign: "center",
        flexWrap:'wrap',
        fontWeight:"normal",
      },

     
    },
  }
  
);


export default createAppContainer(HomeStack);


