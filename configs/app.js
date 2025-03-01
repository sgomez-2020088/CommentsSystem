'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 
import auth from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import userRoutes from '../src/user/user.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
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
    app.use('/v1/category',categoryRoutes)
    app.use('/v1/user',userRoutes)
    app.use('/v1/publication', publicationRoutes)
    app.use('/v1/comment',commentRoutes)

}

export const initServer = async()=> {
    const app = express()

    try{
        configs(app)
        routes(app)
        await createDefaultAdmin()
        await createDefaultCategory()
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.log('Server init failed', err)
    }
    
}

