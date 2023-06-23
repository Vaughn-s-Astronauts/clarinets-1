import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';

let Question = ({product, question}) => {
    console.log(question.question_id);
    const [answers, setAnswers] = useState([]);
    console.log('answers: ', answers);

    const getAnswers = () => {
        let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question.question_id}/answers`;
        axios.get(url, {
            headers:{
                'Authorization' : git_api()
            },
            params: {
                product_id: question.question_id,
                page: 1,
                count: 5
            }
        }).then((response) => {
            console.log('Answers data', response.data.results);
            setAnswers(response.data.results);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div style={{border: '1px solid blue'}}>
            <p className='question '>Q: {question.question_body}</p>
            <p className='answer '>A:  </p>
            <p> by User1234 </p>
            <p> Helpful? Yes </p>
        </div>
    )
};

export default Question;