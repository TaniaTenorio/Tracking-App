import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

// remember reducer is called whenever dispatch is called
const authReducer = (state, action) => {
	// cases that will change the state
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload }
		case 'signin':
			return { errorMessage: '', token: action.payload }
		case 'clear_error_message':
			return { ...state, errorMessage: '' }
		case 'signout':
			return { token: null, errorMessage: '' }
		default:
			return state
	}
}

// define action functions that will modify the state (signup, tryLocalSignin, signin, signout)

const signup = (dispatch) => async ({ email, password }) => {
	// make api request to sign up with that email and password
	try {
		const response = await trackerApi.post('/signup', { email, password })
		// save token in Async storage
		await AsyncStorage.setItem('token', response.data.token)
		// if we sign up, modify our state, and say we are authenticated
		dispatch({ type: 'signin', payload: response.data.token })
		// navigate to main flow, especifically to the track list (using helper function fot navigation)
		navigate('TrackList')
		// if signing up fails, reflect an error message
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong with sign up',
		})
	}
}

// verify if there's an user token then automatically sign in
const tryLocalSignin = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token')
	if (token) {
		dispatch({ type: 'signin', payload: token })
		navigate('TrackList')
	} else {
		navigate('Signup')
	}
}

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' })
}

const signin = (dispatch) => async ({ email, password }) => {
	// try to sign in
	try {
		const response = await trackerApi.post('/signin', { email, password })
		await AsyncStorage.setItem('token', response.data.token)
		// handle success by updating state
		dispatch({ type: 'signin', payload: response.data.token })
		navigate('TrackList')
		// send error message
	} catch (err) {
		console.log(err)
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong with the sign in',
		})
	}
}

const signout = (dispatch) => async () => {
	// remove the token from async storage
	await AsyncStorage.removeItem('token')
	dispatch({ type: 'signout' })
	navigate('loginFlow')
}

// createDataContext receives 3 params = reducer, {actions}, {initial states}
export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin },
	// if token === null -> user not signed in
	{ token: null, errorMessage: '' },
)
