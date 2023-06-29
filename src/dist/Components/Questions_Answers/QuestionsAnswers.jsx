import React, { useState, useEffect } from 'react';
import Search from './subcomponents/Search.jsx';
import Questions from './subcomponents/Questions.jsx';
import AddQuestion from './subcomponents/AddQuestion.jsx';
import API from '../../helpers/API.js';


let QuestionsAnswers = ({product}) => {
    const [questions, setQuestions] = useState([]);
    const [shownQuestions, setShownQuestions] = useState([]);
    const [questionAmount, setQuestionAmount] = useState(2);

    console.log('QUESTIONS: ', questions);

    React.useEffect(() => {
        API.GET_QA_QUESTIONS(product.id).then((response) => {
            setQuestions(response.data.results);
            setShownQuestions(response.data.results.slice(0, questionAmount));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const seeMoreQuestions = () => {
        setQuestionAmount(questionAmount + 2);
    }

    React.useEffect(() => {
        setShownQuestions(questions.slice(0, questionAmount));
    }, [questionAmount]);

    return (
        <div style={{border: '2px solid blue'}}>
            <h1>Questions & Answers</h1>
            <Search />
            <Questions product={product} shownQuestions={shownQuestions}/>
            {(questionAmount < questions.length && questions.length > 2) ?
                <button onClick={seeMoreQuestions}>See more questions</button> :
                null
            }
            <AddQuestion product={product}/>
        </div>
    )
};

export default QuestionsAnswers;