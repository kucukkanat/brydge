import { createServer } from "http";
import { Server, Socket } from "socket.io";

// A signal is a direct message relayed from one peer to another
// over the signaling server.
type SignalMessage = {
    to: string
    data: any
    event: string
}

export async function CreateAndStartServer(_PORT: string) {
    const PORT = _PORT || process.env.PORT || 3000

    // Create HTTP server
    const httpServer = createServer();
    // Server health endpoint
    httpServer.on("request", (req, res) => {
        if (req.url === "/health") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("OK");
        }
    });
    await new Promise(resolve => httpServer.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        resolve(null)
    }))

    // Create socket.io server
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on("connection", socket => {
        console.log(`New client connected ${socket.id}`);
        handleSocketEvents(socket)
    });

    io.on("disconnect", socket => {
        console.log(`Client disconnected ${socket.id}`);
    });

    io.on("error", socket => {
        console.log(`Client error ${socket.id}`);
    });
}

function handleSocketEvents(socket: Socket) {
    socket.on("signal", ({ to, event, data }: SignalMessage) => {
        console.log("signal", data)
        socket.to(to).emit("signal", { from: socket.id, event, data })
    })

    socket.on("join", (roomID: string, userID: string) => {
        console.log(`Client ${userID} joined room ${roomID}`)
        socket.join(roomID)
        socket.to(roomID).emit("user-connected", userID)

        socket.on("disconnect", () => {
            socket.to(roomID).emit("user-disconnected", userID)
        })
    })

}

