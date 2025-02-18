'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 
import auth from '../src/auth/auth.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import  {createDefaultAdmin} from '../configs/setupData.js'
import {createDefaultCategory} from '../configs/setupData.js'




const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(auth)

}

export const initServer = async()=> {
    const app = express()

    try{
        configs(app)
        routes(app)
        createDefaultAdmin()
        createDefaultCategory()
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.log('Server init failed', err)
    }
    
}

