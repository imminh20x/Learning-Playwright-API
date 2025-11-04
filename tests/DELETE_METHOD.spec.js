const { test, expect } = require("@playwright/test");

test('should be able to delete', async ({request})=>{
    // construct data
    const url = 'https://jsonplaceholder.typicode.com/posts/1'

    // send DELETE request
    const response = await request.delete(url)
    const status = response.status()
    
    // stdout
    console.log(status)

    // verification
    expect(status).toBe(200)
})