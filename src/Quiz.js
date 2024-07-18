import React, { useState, useCallback } from 'react';

const Quiz = ({ data, setWrongAnswers, answer, setCurrentQuestionIndex, setUsedNumbers, usedNumbers, setAnswer, setAttem, attem }) => {
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const setNextQuestion = useCallback(() => {
        let availableNumbers = [0, 1, 2, 3, 4].filter(num => !usedNumbers.includes(num));

        if (availableNumbers.length === 0) {
            availableNumbers = [0, 1, 2, 3, 4];
            setUsedNumbers([]);
        }

        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const nextNumber = availableNumbers[randomIndex];

        setUsedNumbers(prev => [...prev, nextNumber]);

        return nextNumber;
    }, [usedNumbers, setUsedNumbers]);

    const handleOption = (index) => {
        setSelectedIndex(index);
        setShowCorrectAnswer(true);
        if (data.correctAnswer === index + 1) {
            setAnswer(prev => prev + 1);
        } else {
            setWrongAnswers(prev => [...prev, {
                question: data.question,
                userAnswer: data.options[index],
                correctAnswer: data.options[data.correctAnswer - 1]
            }]);
        }

        setTimeout(() => {
            const nextQuestionIndex = setNextQuestion();
            setCurrentQuestionIndex(nextQuestionIndex);
            setAttem(attem + 1);
            setShowCorrectAnswer(false);
            setSelectedIndex(null);
        }, 2000);
    }

    const getOptionClasses = (index) => {
        let classes = "cursor-pointer p-3 my-2 rounded-md transition-all duration-300 ";

        if (showCorrectAnswer) {
            if (index === data.correctAnswer - 1) {
                classes += "bg-green-500 text-white";
            } else if (index === selectedIndex) {
                classes += "bg-red-500 text-white";
            } else {
                classes += "bg-gray-200 text-gray-700";
            }
        } else {
            classes += "bg-gray-200 hover:bg-gray-300 text-gray-700";
        }

        return classes;
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <p className="text-lg font-bold mb-2">Question {attem + 1}/5</p>
                <p className="text-xl mb-4">{data.question}</p>
                {data.options && data.options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => !showCorrectAnswer && handleOption(index)}
                        className={getOptionClasses(index)}
                    >
                        {option}
                    </div>
                ))}
                <p className='text-xl mb-4'> Total Correct answer:{answer}</p>
            </div>
        </div>
    )
}

export default Quiz;