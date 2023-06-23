import React, { useState, useEffect } from 'react';
import axios from 'axios';
import git_api from '../../../../../config.js';

let Answer = ({product, question}) => {
    const [answers, setAnswers] = useState([]);
    let id = question.question_id;
    console.log('Answers: ', answers);

    const getAnswers = () => {
      let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${id}/answers`;
        axios.get(url, {
            headers:{
                'Authorization' : git_api()
            },
            params: {
                question_id: id,
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

    useEffect(() => {
        getAnswers();
    }, []);

    return (
        <div>
            <p className='answer '>A: {answers.body}</p>
        </div>
    )
};

export default Answer;