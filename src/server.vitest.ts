import { beforeAll, expect, test } from 'vitest'
import { CreateAndStartServer, ERRORS } from "./server"
import { io, Socket } from "socket.io-client"

let kucukkanat: Socket, nepjua: Socket;

beforeAll(async () => {
    await CreateAndStartServer() // called once before all tests run
    kucukkanat = io("http://localhost:3000?username=kucukkanat")
    nepjua = io("http://localhost:3000?username=nepjua")
    // wait for both clients to connect
    await new Promise(resolve => {
        kucukkanat.on("connect", () => {
            nepjua.on("connect", () => {
                console.log("clients connected")
                resolve(null)
            })
        })
    })
}, 10000)

test('should reject connection if username is not provided', async () => {
    const client = io("http://localhost:3000")
    await new Promise(resolve => {
        client.on("error", (data: any) => {
            expect(data).toEqual(ERRORS.NO_USERNAME)
            resolve(null)
        })
    })
})
test('should reject connection if username is already taken', async () => {
    io("http://localhost:3000?username=clientA")
    const clientB = io("http://localhost:3000?username=clientA")
    await new Promise(resolve => {
        clientB.on("error", (data: any) => {
            expect(data).toEqual(ERRORS.USERNAME_UNAVAILABLE)
            resolve(null)
        })
    })
})

test('should send offer to the correct client', async () => {
    let data = { test: "test  data" }

    const OFFER_EVENT = "offer"
    kucukkanat.emit(OFFER_EVENT, { to: "nepjua", ...data })
    await new Promise(resolve => {
        nepjua.on(OFFER_EVENT, (data: any) => {
            expect(data).toEqual(data)
            expect(data.to).toEqual("nepjua")
            expect(data.from).toEqual("kucukkanat")
            resolve(null)
        })
    })
})

test('should send answer to the correct client', async () => {
    let data = { test: "test  data" }

    const ANSWER_EVENT = "answer"
    kucukkanat.emit(ANSWER_EVENT, { to: "nepjua", ...data })
    await new Promise(resolve => {
        nepjua.on(ANSWER_EVENT, (data: any) => {
            expect(data).toEqual(data)
            expect(data.to).toEqual("nepjua")
            expect(data.from).toEqual("kucukkanat")
            resolve(null)
        })
    })
})

