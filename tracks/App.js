  import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'
import { Provider as LocationProvider } from './src/context/LocationContext'

import AccountScreen from './src/screens/AccountScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'

// create the switch navigator to switch between loginFlow & mainFlow
const switchNavigator = createSwitchNavigator({
	// white screen to show while verifying if theres token in async storage to auto signin
	ResolveAuth: ResolveAuthScreen,
	// create stack navigator to go back & forth between Singnup & Signin screens
	loginFlow: createStackNavigator({
		Signup: SignupScreen,
		Signin: SigninScreen,
	}),
	// create bottom tab navigator to navigate among trackListFlow, TrackCreate & Account screens
	mainFlow: createBottomTabNavigator({
		// create stack navigator to go back & forth between TrackList and TrackDetail
		trackListFlow: createStackNavigator({
			TrackList: TrackListScreen,
			TrackDetail: TrackDetailScreen,
		}),
		TrackCreate: TrackCreateScreen,
		Account: AccountScreen,
	}),
})

const App = createAppContainer(switchNavigator)

export default () => {
	return (
		<LocationProvider>
			<AuthProvider>
				<App
					ref={(navigator) => {
						setNavigator(navigator)
					}}
				/>
			</AuthProvider>
		</LocationProvider>
	)
}
