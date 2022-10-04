import { Server } from "socket.io";

const io = new Server(process.env.PORT, {
  cors: {
    origin: "*",
    allowedHeaders: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected ...");
  socket.on("start-game", (uuid) => {
    socket.join(uuid);
  });
  socket.on("join-game", (uuid) => {
    socket.join(uuid);
    socket.to(uuid).emit("player-2-joined");
  });
  socket.on("move", ({ symbol, uuid, col, row }) => {
    socket.to(uuid).emit("move", { symbol, uuid, col, row });
  });
  socket.on("game-over", (uuid, winningMsg) => {
    socket.to(uuid).emit("game-over", winningMsg);
  });
});
