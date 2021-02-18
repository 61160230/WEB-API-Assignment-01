const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superadmin:020842@cluster0.zkqg0.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'
const client = new MongoClient(url, { userNewUrlParser: true, useUnifiedTopology: true})

async function connect() {
    await client.connect()
}
connect()

app.get('/weather', async (req, res) => {
    try{
        const callLetters =req.query.callLetters
        const db = client.db('sample_weatherdata')
        const collection = db.collection('data')
        let query ={}
        if (callLetters) {
            query.callLetters = callLetters
        }
        const cursor = collection.find(query).limit(2)
        let weather = []
        await cursor.forEach(doc => weather.push("position",doc.position,
                                                "callLetters",doc.callLetters,
                                                "airTemperature",doc.airTemperature,
                                                "ts",doc.ts))
        // await cursor.forEach(doc => weather.push(doc.callLetters))
        // await cursor.forEach(doc => weather.push(doc.airTemperature))
        // await cursor.forEach(doc => weather.push(doc.ts))
        
        console.log(weather)
    }catch(e){
        console.log(e)
    }
})

app.listen(3000, console.log('Start application at port 3000'))
