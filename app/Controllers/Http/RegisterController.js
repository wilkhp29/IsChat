'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

class RegisterController {
    async store({request,auth}){
    
            const body = request.only(['name','email','password']);

            const user = await User.create(body);
    
            const {token} = await auth.attempt(body.email,body.password); 
            
            
            return {user,token}; 
    
    }
}

module.exports = RegisterController
