const express = require("express")
const savedResultsRoute = express.Router()
const SavedResults = require("../models/StoredResults.js")

//Get All

savedResultsRoute.get("/", (req, res, next) => {
    SavedResults.find((err, results) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(results)
    })
})

//Get Results By UserId

savedResultsRoute.get("/user", (req, res, next) => {
    console.log(req.user._id)
    SavedResults.find({ user: req.user._id }, (err, results) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(results)
    })
})

//Post New Saved Result

savedResultsRoute.post("/save", (req, res, next) => {
    req.body.user = req.user._id
    const newSavedResults = new SavedResults(req.body)
    newSavedResults.save(
        (err, newSave) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(newSave)
        })
})

//Delete Saved Result

savedResultsRoute.delete("/delete/:savedResultId", (req, res, next) => {
    console.log(req.body)
    SavedResults.findOneAndDelete({ user: req.user._id, _id: req.params.savedResultId }, (err, deletedSavedResult) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedSavedResult)
    })
})

module.exports = savedResultsRoute