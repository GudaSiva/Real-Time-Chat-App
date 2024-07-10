const Server = require("socket.io")

const io = new Server({ cors : "http://locahttp://localhost:4000"})

io.on("connection",(socket) => {
    console.log(/socket/, socket.id)
});

io.listen(4000);
