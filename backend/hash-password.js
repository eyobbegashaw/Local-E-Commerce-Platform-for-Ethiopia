const bcrypt = require('bcryptjs');

const password = 'admin123'; // Change this to your desired password
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Hashed password:', hash);