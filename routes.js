const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
     <html>
    <head></head>
    <body>
    <form method='POST' action='/message'>
    <input type='text' name='message' ></input>
    <input type='submit' />
    </body>
    </html>
      `);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const pBody = Buffer.concat(body).toString();
      const message = pBody.split("=")[1];
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
    <head></head>
    <body>
    <h1>Server3</h1>
    </body>
    </html>
  `);
  res.end();
};

module.exports = { requestHandler };
