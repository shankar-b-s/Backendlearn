import express from 'express';

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

let lrnstuff = []
let nextid = 1

app.post('/topics',(req,res)=>{
  console.log("HI POST")
  const {topic,time} = req.body
  const newTopic = {id:nextid++,topic,time}
  lrnstuff.push(newTopic)
  res.status(201).send(newTopic)
})

app.get('/topics',(req,res)=>{
  console.log("HI")
  res.status(201).send(lrnstuff)
})

app.get('/topics/:id' , (req,res)=>{
  const findIt = lrnstuff.find(t => parseInt(req.params.id) === t.id)
  if(!findIt){
    return res.status(404).send("Data with ID not found!")
  }
  res.status(201).send(findIt)
})

app.put('/topics/:id', (req,res)=>{
  const findIt = lrnstuff.find(t => parseInt(req.params.id) === t.id)
  if(!findIt){
    return res.status(404).send("Data with ID not found")
  }
  const {topic,time} = req.body
  findIt.topic = topic
  findIt.time = time
  res.status(201).send(findIt)
})

app.delete('/topics/:id', (req,res)=>{
  console.log("delete")
  const id = req.params.id
  const index = lrnstuff.findIndex(t => parseInt(id) === t.id)
  if(index === -1){
    return res.status(404).send("Data not found for given ID")
  }
  lrnstuff.splice(index,1)
  res.status(201).send("Deletion successful")
})
app.listen(port,()=>{
  console.log("Server is running in port")
})