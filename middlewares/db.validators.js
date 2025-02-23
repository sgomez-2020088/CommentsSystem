import User from '../src/user/user.model.js'

export const exitEmailUser = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already`)
        throw new Error(`Email ${email} is already`)
    }
}

export const exitUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already`)
        throw new Error(`Username ${username} is already`)
    }
}


export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

