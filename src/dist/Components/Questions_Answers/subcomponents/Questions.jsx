import React from 'react';
import Question from './Question.jsx';

let Questions = ({product, shownQuestions}) => {
    return (
        <div style={{'maxHeight': '100%', 'overflow': 'auto'}}>
            {shownQuestions.map((question, i) => (
                <Question key={i} product={product} question={question}/>
            ))}
        </div>
    )
};

export default Questions;