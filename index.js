const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // HOMEPAGE OR INDEX.HTML
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type':  'text/html'}) // 200 means everything is ok
    //         res.end(data);
    //     })
    // }
    // ABOUT PAGE
    // if(req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type':  'text/html'}) // 200 means everything is ok
    //         res.end(data);
    //     })
    // }

    // REST API JSON just node
    // if(req.url === '/api/users') {
    //     const users = [
    //         { name: 'Levi', age: 26 },
    //         { name: 'Mikasa', age: 20 },
    //         { name: 'Gerald', age: 25 }
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(users));
    // }

    // BUILD PATH DYNAMIC
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)


    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') { // ENOENT means page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(content, 'utf8');
                })
            }
            else {
                // Some Server Error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else {
            // Success Response
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));