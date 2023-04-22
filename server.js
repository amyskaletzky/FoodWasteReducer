import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import db from "./config/Database.js";
import router from "./routes/Users.js";
import path from 'path';
const __dirname = path.resolve();


dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/imgs', express.static(__dirname + '/imgs'))

app.use(router);

app.listen(process.env.PORT || 8080, () => {
    console.log(`run on ${process.env.PORT || 8080}`)
})

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


try {
    await db.authenticate();
    console.log('database connected');
} catch (err) {
    console.log(err);
}