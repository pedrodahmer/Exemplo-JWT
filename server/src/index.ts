import 'dotenv/config'
import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken'
import cors from 'cors'

import { User } from './entities/User'
import { UserResolver } from './resolvers/UserResolver'; 
import { createAccessToken, createRefreshToken } from './auth';
import { sendRefreshToken } from './sendRefreshToken'


(async () => {

    const app = express();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    app.use(cookieParser())
    
    app.get('/', (_, res) => {
        res.send('pedrao')
    });

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid

        if(!token) {
            return res.send({ ok: false, accessToken: '' })
        }

        let payload: any  = null
        
        try {
            payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        } catch (error) {
            console.log(error)
            return res.send({ ok: false, accessToken: '' })
        }

        //token é valido 
        //da pra mandar o token de volta
        
        const user = await User.findOne({ id: payload.userId })
    
        if(!user) {
            return res.send({ ok: false, accessToken: '' })
        }

        // if (user.tokenVersion !== payload.tokenVersion) {
        //     console.log('pedrao')
        //     return res.send({ ok: false, accessToken: '' })
        // }

        sendRefreshToken(res, createRefreshToken(user))

        return res.send({ ok: true, accessToken: createAccessToken(user) })
    })

    await createConnection();

    const apolloServer = new ApolloServer({
       schema: await buildSchema({
           resolvers: [UserResolver]
       }),
       context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(3333, () => {
        console.log('serivdor rodando em localhost:3333')
    })
})()

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
