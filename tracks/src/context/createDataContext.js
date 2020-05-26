import React, { useReducer } from 'react'

// export the helper function, receives a reducer function, actions and a default state/value
export default (reducer, actions, defaultValue) => {
	const Context = React.createContext()

	// create the provider with the state and dispatch event
	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, defaultValue)

		// loop through all the actions created along the app
		const boundActions = {}
		for (let key in actions) {
			// every action is an object key-value pair
			boundActions[key] = actions[key](dispatch) // call each action with dispatch
		}

		return (
			// value object is all the information provided to all components
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		)
	}
	// provider is the element that will make all of the information available through all the app components
	// context is the object to use to get acces to that info from all of our child components
	return { Context, Provider }
}
