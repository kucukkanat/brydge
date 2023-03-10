import { createServer } from "http";
import { Server, Socket } from "socket.io";
interface ISocket extends Socket {
    username?: string;
}

export const ERRORS = {
    NO_USERNAME: "NO_USERNAME",
    USERNAME_UNAVAILABLE: "USERNAME_UNAVAILABLE"
}

export async function CreateAndStartServer(_PORT?: string) {
    const PORT = _PORT || process.env.PORT || 3000

    // Create HTTP server
    const httpServer = createServer();
    CreateSocketServer(httpServer)
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


}

export const clients: {
    [key: string]: ISocket
} = {}
function findByUsername(username: string) {
    return clients[username] || null
}
function findbyID(id: string) {
    for (const [_, value] of Object.entries(clients)) {
        if (value.id === id) {
            return value
        }
    }
    return null
}
function CreateSocketServer(httpServer: ReturnType<typeof createServer>) {
    // Create socket.io server
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on("connection", (socket: ISocket) => {
        const username = socket.handshake.query.username as string
        // TEST 1: Reject the connection if client is trying to connect without a username
        if (!username) {
            socket.emit("error", ERRORS.NO_USERNAME)
            socket.disconnect()
        }
        // TEST 2: Reject the conenction if client is trying to connect with an already taken username
        else if (findByUsername(username as string)) {
            socket.emit("error", ERRORS.USERNAME_UNAVAILABLE)
            socket.disconnect()
        } else {
            // TEST 3: Assign the username to the socket
            clients[username] = socket
            socket.username = username
        }

        console.log(`New client connected ${socket.id} with username ${username}`);


        // ================ Handle signaling events ================ //

        // TEST 4: Emit offer event to the client with given username
        socket.on("offer", (data: any) => {
            console.log(`Received signal from ${socket.id} to ${data.to}`)
            // Find the socket with the given username
            const toID = findByUsername(data.to).id
            socket.to(toID).emit("offer", { ...data, from: socket.username })
        })

        // TEST 5: Emit answer event to the client with given username
        socket.on("answer", (data: any) => {
            console.log(`Received signal from ${socket.id} to ${data.to}`)
            // Find the socket with the given username
            const toID = findByUsername(data.to).id
            socket.to(toID).emit("answer", { ...data, from: socket.username })
        })
    });

    io.on("disconnect", socket => {
        console.log(`Client disconnected ${socket.id}`);
    });

    io.on("error", socket => {
        console.log(`Client error ${socket.id}`);
    });
}
