const express = require("express")
const userRoute = express.Router()
const User = require("../models/User.js")

//Get All

userRoute.get("/", (req, res, next) => {
    User.find((err, users) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})

module.exports = userRoute