import React, { useState, useEffect } from 'react';
import Search from './subcomponents/Search.jsx';
import Questions from './subcomponents/Questions.jsx';
import AddQuestion from './subcomponents/AddQuestion.jsx';
import API from '../../helpers/API.js';


let QuestionsAnswers = ({product}) => {
    const [questions, setQuestions] = useState([]);
    const [shownQuestions, setShownQuestions] = useState([]);
    const [questionAmount, setQuestionAmount] = useState(2);

    console.log(questions);
    // Filters questions according to search params
    const search = (chars) => {
        console.log('searching: ', chars);
        // let searched = questions.filter((question) => {
        //     question.question_body.includes(chars);
        // });
        // setSearchedQuestions(searched);
      }

    // Handle submitting a question, posting to server
    const handleSubmitQues = (formData) => {
        API.POST_QA_QUESTION(formData).then((response) => {
            console.log('Question submitted!', response);
            getAndSet();
        }).catch((error) => {
            console.log(error);
        });
    };

    // This is used to get questions from server and set them as state
    const getAndSet = () => {
        API.GET_QA_QUESTIONS(product.id).then((response) => {
            setQuestions(response.data.results);
            setShownQuestions(response.data.results.slice(0, questionAmount));
        }).catch((error) => {
            console.log(error);
        });
    }

    // These handle expalding the question list
    const seeMoreQuestions = () => {
        setQuestionAmount(questionAmount + 2);
    }

    React.useEffect(() => {
        setShownQuestions(questions.slice(0, questionAmount));
    }, [questionAmount, questions]);

    // This handles the initial get and set on load
    React.useEffect(() => {
        getAndSet();
    }, []);


    return (
        <div>
            <h1>Questions & Answers</h1>
            <Search search={search}/>
            <Questions product={product} shownQuestions={shownQuestions}/>
            {(questionAmount < questions.length && questions.length > 2) ?
                <button onClick={seeMoreQuestions}>See more questions</button> :
                null
            }
            <AddQuestion product={product} handleSubmitQues={handleSubmitQues}/>
        </div>
    )
};

export default QuestionsAnswers;