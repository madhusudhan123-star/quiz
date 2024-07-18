import React, { useEffect, useState } from 'react'
import Quiz from './Quiz';
import data from './data'
import './App.css'

const App = () => {
  const [usedNumbers, setUsedNumbers] = useState([1]);
  const [attem, setAttem] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const { multipleChoiceQuestions } = data;

  useEffect(() => {
    setCurrentQuestionIndex(Math.floor(Math.random() * 5));
  }, []);

  if (attem === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Quiz Completed</h1>
          <h2 className="text-xl mb-4 text-gray-700">Thank you for answering the quiz!</h2>
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">Your score is: {answer}</h2>
          {wrongAnswers.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Wrong Answers:</h3>
              {wrongAnswers.map((wrong, index) => (
                <div key={index} className="mb-4 text-left">
                  <p><strong>Question:</strong> {wrong.question}</p>
                  <p><strong>Your answer:</strong> {wrong.userAnswer}</p>
                  <p><strong>Correct answer:</strong> {wrong.correctAnswer}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              setAttem(0);
              setWrongAnswers([]);
              setAnswer(0)
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Restart
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-800 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Quiz</h1>
        <Quiz
          key={attem}
          setAttem={setAttem}
          attem={attem}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setAnswer={setAnswer}
          wrongAnswers={wrongAnswers}
          setWrongAnswers={setWrongAnswers}
          setUsedNumbers={setUsedNumbers}
          usedNumbers={usedNumbers}
          answer={answer}
          data={multipleChoiceQuestions[currentQuestionIndex]}
        />
      </div>
    </div>
  )
}

export default App