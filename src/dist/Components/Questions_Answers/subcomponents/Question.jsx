import React, { useState, useEffect } from 'react';
import axios from 'axios';
import git_api from '../../../../../config.js';
import Answer from './Answer.jsx';
import API from '../../../helpers/API.js';

let Question = ({product, question}) => {
    const [answers, setAnswers] = useState([]);
    let id = question.question_id;

    React.useEffect(() => {
        API.GET_QA_QUESTION_ANSWERS(id).then((response) => {
            setAnswers(response.data.results);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    // const getAnswers = () => {
    //   let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${id}/answers`;
    //     axios.get(url, {
    //         headers:{
    //             'Authorization' : git_api()
    //         },
    //         params: {
    //             question_id: id,
    //             page: 1,
    //             count: 5
    //         }
    //     }).then((response) => {
    //         console.log('Answers data', response.data.results);
    //         setAnswers(response.data.results);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };

    // useEffect(() => {
    //     getAnswers();
    // }, []);

    return (
        <div style={{border: '1px solid blue'}}>
            <p className='question '>Q: {question.question_body}</p>
            <Answer product={product} answers={answers} />
            <p> by User1234 </p>
            <p> Helpful? Yes </p>
        </div>
    )
};

export default Question;