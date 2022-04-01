import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { artistsData } from "./data"

const colors = ["gray", "red", "green", "blue", "teal", "purple"]
const genre = ["A", "B", "C", "D"]
const name = ["Duis vel felis", "Proin auctor placerat", "Aliquam hendrerit", "eleifend odio", " Vivamus vel ex id", "turpis imperdiet", "faucibus", "Aenean elementum", "accumsan lectus", "Mauris tellus diam"]

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getGenre() {
    return genre[getRandomInt(3)]
}

function getColor() {
    return colors[getRandomInt(5)]
}

function getRandomImg() {
    return `https://picsum.photos/250?random=${getRandomInt(20)}`
}

const prisma = new PrismaClient()

const connect = async () => {
    await Promise.all(
        artistsData.map(async (artist) => {
            return prisma.artist.upsert({
                where: { name: artist.name },
                update: {},
                create: {
                    name: artist.name,
                    songs: {
                        create: artist.songs.map(song => ({
                            name: song.name,
                            duration: song.duration,
                            url: song.url,
                            img: getRandomImg(),
                            genre: getGenre(),
                            description: song.description ? song.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum felis tellus, fermentum in nisi lacinia, faucibus rhoncus lacus. Nullam scelerisque vestibulum mi sagittis congue. Pellentesque ante"
                        }))
                    }
                }
            })
        })
    )

    const salt = bcrypt.genSaltSync()

    const user = await prisma.user.upsert({
        where: { email: "usertest@email.com" },
        update: {},
        create: {
            username: "test user",
            email: "usertest@email.com",
            password: bcrypt.hashSync("password", salt),
            color: "green",
            favorites: [1, 2]
        }
    })

    const songs = await prisma.song.findMany({})
    Promise.all(new Array(6).fill(1).map(async (_, index: number) => {
        return prisma.playlist.create({
            data: {
                name: name[index],
                user: {
                    connect: { id: user.id }
                },
                songs: {
                    connect: songs.map(song => ({
                        id: song.id
                    }))
                },
                color: getColor(),
                img: getRandomImg()
            }
        })
    }))
}

connect()
    .catch(err => {
        console.log(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })