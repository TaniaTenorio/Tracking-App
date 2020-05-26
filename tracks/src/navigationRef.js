import { NavigationActions } from 'react-navigation'

// function to get access to the navigator
let navigator

export const setNavigator = (nav) => {
	navigator = nav
}

// function available for every file to navigate
export const navigate = (routeName, params) => {
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		}),
	)
}
