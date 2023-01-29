const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')

const app = express()
app.use(cors())


app.get('/words', (req,res) =>{
    const selectedLevel = req.query.level 
    
    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: {level: selectedLevel, area: 'sat'},
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        res.json(response.data)
      }).catch(function (error) {
        console.error(error);
      });
} )



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

