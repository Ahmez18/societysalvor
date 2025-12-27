// hash.js
const bcrypt = require("bcryptjs");

const password = "admin123"; // ← Change to your desired password
bcrypt.hash(password, 10).then(hash => console.log(hash));