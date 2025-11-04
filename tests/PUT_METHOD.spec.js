import { test, expect } from "@playwright/test"

test('should be able to create a new put', async ({ request }) => {

    // construct data
    const url = 'https://jsonplaceholder.typicode.com/posts/1'

    const putContent = {
        id: 1,
        title: 'new',
        body: 'content',
        userId: 1
    }
    const options = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        data: putContent
    }

    // send PUT request
    const response = await (request.put(url, options))
    const rsBody = await response.json()
    const status = response.status()

    // stdout
    console.log(rsBody)
    console.log(status)

    // verification
    expect(status).toBe(200)
    const { id, title, body, userId } = rsBody
    expect(id).toBe(putContent.id)
    expect(id).toBe(putContent.id)
    expect(title).toBe(putContent.title)
    expect(body).toBe(putContent.body)
    expect(userId).toBe(putContent.userId)

});