const {test,trait} = use('Test/Suite')('Session');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return JWT token when session created',async ({assert,client}) =>{
    const sessionPayload ={
        email:"wilkhp29@gmail.com",
        password:'123456'
    }


    const user = await Factory
    .model("App/Models/User")
    .create(sessionPayload);

    const response = await client
    .post('/sessions')
    .send(sessionPayload).end();    
    
    response.assertStatus(200);
    assert.exists(response.body.token);
});


test("it should return JWT Token when register the user and session createding",async ({assert,client}) =>{
    const registerPayload ={
        email:"wilkhp29@gmail.com",
        password:'123456',
    }
   
    
    const response = await client
    .post("/register")
    .send(user)
    .end();


    response.assertStatus(200);
    assert.exists(response.body.token);
});