import React from 'react';
import Question from './Question.jsx';

let Questions = ({product, questions}) => {
    console.log(questions);

    return (
        <div>
            {questions.map(question => (
                <Question key={question.question_id} product={product} question={question}/>
            ))}
        </div>
    )
};

export default Questions;