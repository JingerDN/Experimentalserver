const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const corsMiddleware=require("./middleware/cors.middleware");
const authRouter = require("./routes/auth.routes");


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(corsMiddleware);
app.use("/api/auth", authRouter);


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});



(async () => {
    try {
        await mongoose.connect(process.env.dbUrl,{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
          });

        app.listen(3333, () => {
            console.log('Server started on port 3333')
        })
    } catch (e) {
        console.log(e);
    }
})()
//process.env.PORT
