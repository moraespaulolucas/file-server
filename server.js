// http module allows Node.js to use the HTTP and create a Web Server
const http = require("http");
// file system module allows the server to work with static files
const fs = require("fs");
// path module allows the server to work with directories and file paths
const path = require("path");

// MIME-types contains the types of documents accepted by the server
const mimeTypes = require("./mimeTypes");
// port receives a environment variable or a specific port for the server listen to
const port = process.env.PORT || 3000;

// on creating the server, req is the client request and res is the server response
http
	.createServer((req, res) => {
		// filePath will receive the path of every file transferred by the server at the request
		let filePath = "." + req.url;
		// filePath will be index.html path if the requested url is "./"
		if (filePath === "./") {
			filePath = "./index.html";
		}

		// printing filePath
		console.log(filePath);

		// path.extname extracts the file extension of filePath
		let extname = String(path.extname(filePath)).toLowerCase();
		// contentType receives the extname MIME-type if it is declared or a generic binary MIME-type
		let contentType = mimeTypes[extname] || "application/octet-stream";

		// fs.readFile tries to read the filePath content
		fs.readFile(filePath, (error, content) => {
			// if there is an error
			if (error) {
				// it send a not found response status code
				res.writeHead(404, { "Content-Type": "text/html" });
				res.end("Not Found", "utf-8");
			}
			// if all goes well
			else {
				// it sends the filePath content to the client
				res.writeHead(200, { "Content-type": contentType });
				res.end(content, "utf-8");
			}
			// HTTP response status codes:
			// 200 >> success
			// 404 >> not found
			// 500 >> internal server error
		});
	}) // server listening to the right port and logging a message on the console
	.listen(port, () => console.log(`Server running on port ${port}`));
