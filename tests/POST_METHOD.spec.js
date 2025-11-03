const { test, expect } = require("@playwright/test");

test('should be able to create a new post', async ({ request }) => {
    //construct
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const postContent = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    }
    const options = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        data: postContent
    } 

    //send a POST request
    const response =  await request.post(url, options)
    const rsBody = await response.json()
    const status = response.status()

    //stdout
    console.log(rsBody)
    console.log(status)

    //verification
    expect(status, 'status must be 201').toBe(201)

    const {id, title, body, userId} = rsBody
    expect(title, 'must be request data').toBe(postContent.title)
    expect(body, 'must be request data').toBe(postContent.body)
    expect(userId, 'must be request data').toBe(postContent.userId)
    expect(id,"must have id").toBeTruthy()
})