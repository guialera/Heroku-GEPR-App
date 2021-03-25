const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const expressJwt = require("express-jwt")
const path = require("path")
const port = process.env.PORT || 9000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("Connected to MonogDB!"))
    .catch(error => console.log(error))

app.use(express.json())

app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "client", "build")))

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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(port, () => {
    console.log("Running on Port 9000")
})