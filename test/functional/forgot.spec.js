const {test,trait} = use('Test/Suite')('forget');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const Mail = use('Mail');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return email when forget created',async ({assert,client}) =>{
    Mail.fake();
    const forgetPayload ={
        email:"wilkhp29@gmail.com"
    }

    const user = await Factory
    .model('App/Models/User')
    .create(forgetPayload);

    const response = await client
    .post('/forget')
    .send(forgetPayload)
    .end();    
    
    response.assertStatus(204);


    const recentEmail = Mail.pullRecent()
   
    assert.equal(recentEmail.message.to[0].address, forgetPayload.email)
    
    const token =  await user.tokens().first();
    
    assert.include(token.toJSON(),{
        user_id:user.id,
        type:"forgotpassword",
    });

    Mail.restore() 
});