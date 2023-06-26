import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import API from '../../../helpers/API.js';

let Question = ({question}) => {
    const [answers, setAnswers] = useState([]);
    let id = question.question_id;

    React.useEffect(() => {
        API.GET_QA_QUESTION_ANSWERS(id).then((response) => {
            setAnswers(response.data.results);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div style={{border: '1px solid blue'}}>
            <p style={{'fontSize': '18px', 'fontWeight': 'bold'}}>Q: {question.question_body}</p>
            {answers.map((answer, i) => {
                return <Answer key={i} answer={answer} />
            })}
        </div>
    )
};

export default Question;