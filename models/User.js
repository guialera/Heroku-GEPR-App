const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

// Pre Save Hook To Hash User Password On Sign Up

userSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash
        next()
    })
})

//Method To Check Encrypted Password On Login

userSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err)
        return callback(null, isMatch)
    })
}

//Method To Remove Password For Token/Sending Response

userSchema.methods.withoutPassword = function () {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)