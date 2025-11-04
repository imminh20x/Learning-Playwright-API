/*
Create a CRUD flow
*/
import dotenv from 'dotenv'
import { test } from "@playwright/test";

dotenv.config()

test('should be able to perform CRUD on post type', async ({ request }) => {

    // construct data
    const baseUrl = process.env.BASE_URL
    const headers = { 'Content-type': 'application/json; charset=UTF-8' }

    const postContent = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    }
    const postOptions = {
        headers: headers,
        data: postContent
    }

    const putContent = {
        title: 'updated',
        body: 'name',
        userId: 1,
    }
    const putOptions = {
        headers: headers,
        data: putContent
    }

    // post
    const postRes = await request.post(`${baseUrl}/posts`, postOptions)
    const postJsonBody = await postRes.json()
    const { id, title, body, userId } = postJsonBody
    console.log(postJsonBody)
    // TODO: verification

    // get with id 100 because api does not create new data
    const getRes = await request.get(`${baseUrl}/posts/${id-1}`)
    const getJsonBody = await getRes.json()
    console.log(getJsonBody)
    // TODO: verification

    // update
    const putRes = await request.put(`${baseUrl}/posts/${id-1}`, putOptions)
    const putJsonBody = await putRes.json()
    console.log(putJsonBody)
    // TODO: verification

    //  delete
    const deleteRes = await request.delete(`${baseUrl}/posts/${id-1}`)
    const deleteStatus = deleteRes.status()
    console.log('delete status:', deleteStatus)
    
})