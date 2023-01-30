import axios from "axios";
import {useEffect, useState } from 'react'
import './index.css'



const App = () => {
  const [chosenLevel , setChosenLevel] = useState(null)
  const [ words, setWords ] = useState(null)
  const [correctAnswers, setCorrectAnswers ] = useState([])
  const [clicked, setClicked ] = useState([])
  const [ score, setScore ] = useState(0)



  useEffect(() => {
    const getRandomWords = () => {
      const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: {level: chosenLevel, area: 'sat'},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        setWords(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }

    if (chosenLevel) getRandomWords()
   
  }, [chosenLevel])


  const checkAnswer = (option, chosenOption , correctAnswer) =>{
    
    if( chosenOption === correctAnswer ){
        setCorrectAnswers([...correctAnswers , option  ])
        setScore((score)  => score + 1)
    } else{ setScore((score)  => score - 1) }
    setClicked([...clicked, option])
   
  }
  return (
    <div className='App'>
      {!chosenLevel && <div className="level-selector">
        <h1>Word Association Game</h1>
        <h2>Select Your Level to Start</h2>
        <select 
          name='levels' 
          id='levels' value={chosenLevel}
          onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>Select Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
          <option value="10">Level 10</option>
          
        </select>
      </div>}
      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to Level: {chosenLevel}</h1>
        <h2>Score Rules: Correct:+1 Incorrect:-1</h2>
        <h3>Your Score: {score}</h3>
        <div className="questions">
        { words.quizlist.map(( question , _questionIndex) => 
        <div key={_questionIndex} className="question-box">
          {question.quiz.map((tip, _index) => 
            <p key={_index}>{tip}</p>
          )}
          <div className="question-buttons">
            {question.option.map( (option,optionIndex) => (
              <div key={optionIndex} className="question-button">
                <button
                  disabled = { clicked.includes(option) } 
                  onClick={() => checkAnswer( option, optionIndex + 1 , question.correct)}
                > {option} </button>
                { correctAnswers.includes(option) && <p>Correct!!</p>}
              </div>
            )
            )}
          </div>
          
        </div>)}
        </div>
        
        
        <button className="back-button" onClick={ () => setChosenLevel(null)}>Go Back</button> 
        
      </div>}
    </div>
  );
}

export default App;
