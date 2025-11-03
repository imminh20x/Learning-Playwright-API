const { test, expect } = require("@playwright/test");

test('should be able to send a GET method', async ({request}) => { 
    const response = await request.get('https://jsonplaceholder.typicode.com/posts')

    //Extract response data
    const jsonBody = await response.json()
    const status =  response.status()
    // const {userId, id, title, body} = jsonBody[0]

    const randomIndex = Math.floor(Math.random() * jsonBody.length)
    const {userId, id, title, body} = jsonBody[randomIndex]

    //Verification
    expect(status).toBe(200)
    expect(jsonBody.length).toBeGreaterThan(0)
    expect(userId).toBeTruthy()
    expect(id).toBe(randomIndex+1)
    expect(title).toBeTruthy()
    expect(body).toBeTruthy()

    //print
    // console.log(status)
    // console.log(jsonBody)
})