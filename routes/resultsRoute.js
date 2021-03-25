const express = require("express")
const resultsRoute = express.Router()
const ElectionResults = require("../models/ElectionResults.js")

//Get All Results

resultsRoute.get("/", (req, res, next) => {
    ElectionResults.find((err, results) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(results)
    })
})

//Get Results By Year

resultsRoute.get("/:electionYear", (req, res, next) => {
    ElectionResults.find({ electionYear: req.params.electionYear }, (err, results) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(results)
    })
})

//Post New Result

resultsRoute.post("/", (req, res, next) => {
    const newResult = new ElectionResults(req.body)
    newResult.save((err, savedResult) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedResult)
    })
})

//Update Result

resultsRoute.put("/:resultId", (req, res, next) => {
    ElectionResults.findOneAndUpdate(
        { _id: req.params.resultId },
        req.body,
        { new: true },
        (err, updatedResult) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(200).send(updatedResult)
        }
    )
})

module.exports = resultsRoute