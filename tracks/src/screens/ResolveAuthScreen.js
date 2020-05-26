import React, { useEffect, useContext } from 'react'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

const ResolveAuthScreen = () => {
	const { tryLocalSignin } = useContext(AuthContext)

	// call tryLocalSignin function as soon as the screen loads
	useEffect(() => {
		tryLocalSignin()
	}, [])

	return null
}

export default ResolveAuthScreen
