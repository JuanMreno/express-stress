const express = require('express');
const { spawn } = require("child_process");
const { rejects } = require('assert');

const app = express();
const port = 3000;

app.get('/cpu/:time', (req, res) => {
    res.send('Hello World!' + req.params.time);

    const ls = spawn("node", ["-v"]);

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

})

app.get('/test/', (req, res) => {
    res.code = 200;
    res.send('OK');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

