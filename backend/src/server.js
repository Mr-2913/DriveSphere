import "dotenv/config";
import app from './app.js';
import connect_Database from "./config/mongodb.config.js";

connect_Database();

const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`app is run on http://localhost:${port}`);
});