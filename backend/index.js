import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import path from "path";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

const allowlist = [
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(cors(corsOptionsDelegate));

const saltRounds = 10;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

let currentUserId = 1;
db.connect();

app.get("/api/v3/utkubora", (req, res) => {
   console.log("utkubora"); 
  res.json({
    name: "utkubora",
    age: 25,
    location: "Ankara 31",
  });
});

app.post("/api/v3/login", async (req, res) => {
    const email = req.body.email;
    const loginPassword = req.body.password;
    console.log(req.body);
    try{
        const result =  await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(result.rows.length > 0){
            const user = result.rows[0];
            console.log(user);
            const storedHashedPassword = user.password;
            bcrypt.compare(loginPassword, storedHashedPassword, async (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    if (result) {
                        //login basarili
                        const ClientId = await db.query("SELECT id FROM users WHERE email = $1", [email]);
                        currentUserId = ClientId.rows[0].id;
                        res.status(200).send("Logged in");
                    } else {
                        console.log("wrong password");
                        res.status(404);
                    }
                }
            });
        }
        else{
            console.log("user not found")
            res.status(404);
        }
    }
    catch(err){
        console.log(err);
        res.status(404);
    }
});

app.post("/api/v3/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(req.body);//gecici

    try{
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkResult.rows.lengt > 0){
            res.send("Email exists");
        }else{
            bcrypt.hash(password, saltRounds, async (err, hash)=>{
                if(err){
                    console.error("Error hashing password");
                }else{
                    console.log("Hashed password.");
                    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email,hash]);
                    res.status(200).send("Authenticated");
                }
            })
        }

    }
    catch(err){
        console.log(err);
    }
});

app.get("/api/v3/notes", async (req, res) => {
    let notes = [];
    let noteIds = [];
    try{
        const result = await db.query("SELECT * FROM enrollment WHERE user_id = $1", [currentUserId]);
        result.rows.forEach((row) => {
            noteIds.push(row.note_id);
        });
        for(const noteId of noteIds){
            const noteResult = await db.query("SELECT * FROM notes WHERE id = $1", [noteId]);
            notes.push(noteResult.rows[0]);
        }
    }
    catch(err){
        console.log(err);
    }
    res.json({
        notes: notes,
      });
});

app.post("/api/v3/addnote", async (req, res)=>{
    const title = req.body.title;
    const content = req.body.content;
    try{
        const result = await db.query("INSERT INTO notes (note_title, note) VALUES ($1, $2) RETURNING id", [title, content]);
        const noteId = result.rows[0].id;
        await db.query("INSERT INTO enrollment (user_id, note_id) VALUES ($1, $2)", [currentUserId, noteId]);
        res.status(200).send("Note added");
    }
    catch(err){
        console.log(err);
    }
});

app.post("/api/v3/deletenote", async (req, res)=> {
    const noteId = req.body.id;
    try{
        await db.query("DELETE FROM enrollment WHERE user_id = $1 AND note_id = $2", [currentUserId, noteId]);
        await db.query("DELETE FROM notes WHERE id = $1", [noteId]);
        res.status(200).send("Note deleted");
    }
    catch(err){
        console.log(err);
    }
});

app.listen(3000, () => {
  console.log("server is running on port" + port);
});
