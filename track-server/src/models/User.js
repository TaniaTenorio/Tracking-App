const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

// salt and hash passwords every time a new user is created
userSchema.pre('save', function(next) {
	// this === the user we are operating on
	const user = this
	if (!user.isModified('password')) {
		return next()
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err)
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err)
			}
			user.password = hash
			next()
		})
	})
})

// method to compare is hashed password stored is equal to password the user is using to log in
userSchema.methods.comparePassword = function(candidatePassword) {
	const user = this
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return reject(err)
			}

			if (!isMatch) {
				return reject(false)
			}

			resolve(true)
		})
	})
}

mongoose.model('User', userSchema)
