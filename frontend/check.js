import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_KEY;
console.log("API KEY:", API_KEY);

const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`
);

const data = await res.json();
console.log(data);
