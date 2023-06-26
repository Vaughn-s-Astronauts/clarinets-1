import React from 'react';
import Question from './Question.jsx';

let Questions = ({questions}) => {

    return (
        <div>
            {questions.map((question, i) => (
                <Question key={i} question={question}/>
            ))}
        </div>
    )
};

export default Questions;