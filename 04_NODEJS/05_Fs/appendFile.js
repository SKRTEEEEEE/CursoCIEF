const fs = require("node:fs");

fs.appendFile("text2.txt", "\nHello World!", (err) => {
    if (err) throw err;
    console.log("File saved!");
})

