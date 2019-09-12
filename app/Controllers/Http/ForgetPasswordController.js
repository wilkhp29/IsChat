'use strict'

const Mail = use("Mail");
const Env = use("Env");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const { randomBytes } = require('crypto');
const { promisify } = require("util");


class ForgetPasswordController {
    async store({request}){
     
        const email = request.input('email');

        const user = await User.findByOrFail('email',email);

        const random = await promisify(randomBytes)(16);
        const  token = random.toString('hex');

        await user.tokens().create({
            token,
            type:'forgotpassword'
        })
        
        const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`

       await Mail.send(
           "emails.welcome",
            {name:user.name,resetPasswordUrl},
            (message) =>{  
            message
            .to(user.email)
            .from('wilkhp29@gmail.com')
            .subject("welcome to yardstick");
            });

}
}

module.exports = ForgetPasswordController
