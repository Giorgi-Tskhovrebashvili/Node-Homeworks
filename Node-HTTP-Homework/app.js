import http from "http";
import moment from "moment";

const port = 3002;

let users = [
    {
        id: 1,
        name: "gio",
        email: "gio.cxovrebashvili@gmail.com",
        password: "12345678",
      }
];

const postServer = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/auth/signup") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { name, email, password } = JSON.parse(body);
      const id = users.length + 1;
      const time = moment().locale("ka").format("LLL");
      const newUser = { id, name, email, password, time };
      users.push(newUser);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    });
  } else if (req.method === "GET" && req.url === "/api/users") {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
  }
});

postServer.listen(port, "localhost", null, () => {
  console.log(`Server is running on port ${port}`);
});
