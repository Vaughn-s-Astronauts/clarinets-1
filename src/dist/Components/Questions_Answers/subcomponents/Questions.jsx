import React from 'react';
import Question from './Question.jsx';

let Questions = ({questions}) => {

    return (
        <div>
            {questions.map(question => (
                <Question key={question.question_id} question={question}/>
            ))}
        </div>
    )
};

export default Questions;