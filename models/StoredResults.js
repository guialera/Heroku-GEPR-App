const mongoose = require("mongoose")
const Schema = mongoose.Schema

const savedResultsSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    electionYear: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    demWon: {
        type: Boolean,
        required: true
    },
    gopWon: {
        type: Boolean,
        required: true
    },
    candidateDem: {
        type: String,
        required: true
    },
    candidateGop: {
        type: String,
        required: true
    },
    percentDemResult: {
        type: Number,
        required: true
    },
    numberDemResult: {
        type: Number,
        required: true
    },
    numberGopResult: {
        type: Number,
        required: true
    },
    percentGopResult: {
        type: Number,
        required: true
    },
    marginOfVictory: {
        type: Number,
        required: true
    },
    electoralVotes: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("StoredResults", savedResultsSchema)