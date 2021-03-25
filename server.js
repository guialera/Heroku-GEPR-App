const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const expressJwt = require("express-jwt")

mongoose.connect("mongodb://localhost:27017/fs-final-project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("Connected to MonogDB!"))
    .catch(error => console.log(error))

app.use(express.json())

app.use(morgan("dev"))

app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }))
app.use("/auth", require("./routes/authRoute.js"))
app.use("/api/user", require("./routes/userRoute.js"))
app.use("/api/savedResults", require("./routes/savedResultsRoute.js"))
app.use("/api/results", require("./routes/resultsRoute.js"))

app.use((err, req, res, next) => {
    console.log(err)
    if (err === "UnauthorizedErr") {
        res.status(err.status)
    }
    return res.send({ errMessage: err.message })
})

app.listen(9000, () => {
    console.log("Running on Port 9000")
})