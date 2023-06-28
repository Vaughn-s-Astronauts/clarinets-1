import React, { useState, useEffect } from 'react';
import Search from './subcomponents/Search.jsx';
import Questions from './subcomponents/Questions.jsx';
import API from '../../helpers/API.js';


let QuestionsAnswers = ({product}) => {
    const [questions, setQuestions] = useState([]);

    React.useEffect(() => {
        API.GET_QA_QUESTIONS(product.id).then((response) => {
            setQuestions(response.data.results);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div style={{border: '2px solid blue'}}>
            <h1>Questions & Answers</h1>
            <Search />
            <Questions product={product} questions={questions}/>
            <button>More Answered Questions</button>
            <button>Add a Question</button>
        </div>
    )
};

export default QuestionsAnswers;