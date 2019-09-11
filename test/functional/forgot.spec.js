const {test,trait} = use('Test/Suite')('forget');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const Mail = use('Mail');

trait('Test/ApiClient');

test('it should return email when forget created',async ({assert,client}) =>{
    Mail.fake();
    const forgetPayload ={
        email:"wilkhp29@gmail.com",
        password:'123456'
    }


    const response = await client
    .post('/forget')
    .send(forgetPayload).end();    
    
    response.assertStatus(200);


    const recentEmail = Mail.pullRecent()
    assert.equal(recentEmail.to.address, forgetPayload.email)

  
    Mail.restore() 
});