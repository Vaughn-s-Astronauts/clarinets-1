import React, { useState, useEffect } from 'react';
import Search from './subcomponents/Search.jsx';
import Questions from './subcomponents/Questions.jsx';
import axios from 'axios';
import git_api from '../../../../config.js';


let QuestionsAnswers = ({product}) => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = () => {
        let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/`;
        axios.get(url, {
            headers:{
                'Authorization' : git_api()
            },
            params: {
                product_id: product.id,
                page: 1,
                count: 5
            }
        }).then((response) => {
            console.log(response.data.results);
            setQuestions(response.data.results);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getQuestions();
    }, []);

    // for (var i = 0; i < questions.length; i++) {
    //     console.log(questions[i].question_body);
    // }

    return (
        <div style={{border: '1px solid pink'}}>
            <h1>Questions & Answers</h1>
            <Search />
            <Questions product={product} questions={questions}/>
            <button>More Answered Questions</button>
            <button>Add a Question</button>
        </div>
    )
};

export default QuestionsAnswers;