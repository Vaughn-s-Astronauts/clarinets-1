import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import API from '../../../helpers/API.js';

let Question = ({question}) => {
    const [answers, setAnswers] = useState([]);
    let id = question.question_id;
    console.log(question);

    React.useEffect(() => {
        API.GET_QA_QUESTION_ANSWERS(id).then((response) => {
            setAnswers(response.data.results);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div style={{border: '1px solid blue'}}>
            <p className='question '>Q: {question.question_body}</p>
            {answers.map(answer => {
                return <Answer key={answer.answer_id} answer={answer} />
            })}
            <p> by User1234 </p>
            <p> Helpful? Yes </p>
        </div>
    )
};

export default Question;