import { useState, useEffect } from 'react'
import {
	Accuracy,
	requestPermissionAsync,
	watchPositionAsync,
} from 'expo-location'

export default (shouldTrack, callback) => {
	const [err, setErr] = useState(null)
	const [subscriber, setSubscriber] = useState(null)

	// helper function to request location permission and handle error if permission denied
	const startWatching = async () => {
		try {
			await requestPermissionsAsync()
			const sub = await watchPositionAsync(
				{
					accuracy: Accuracy.BestForNavigation,
					timeInterval: 1000,
					distanceInterval: 10,
				},
				callback,
			)
			setSubscriber(sub)
		} catch (e) {
			setErr(e)
		}
	}

	useEffect(() => {
		if (shouldTrack) {
			startWatching()
		} else {
			sub.remove()
			setSubscriber(null)
		}
	}, [shouldTrack])

	return [err]
}
