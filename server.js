const http = require('http');
const fs = require('fs');
const path = require('path');

const directoryPath = './';

const server = http.createServer((req, res) => {
    const filePath = path.join(directoryPath, req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

const port = 3001;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
