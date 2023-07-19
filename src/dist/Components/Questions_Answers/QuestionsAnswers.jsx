import React, { useState, useEffect } from 'react';
import Search from './subcomponents/Search.jsx';
import Questions from './subcomponents/Questions.jsx';
import AddQuestion from './subcomponents/AddQuestion.jsx';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import API from '../../helpers/API.js';


let QuestionsAnswers = ({product}) => {
    const [questions, setQuestions] = useState([]);
    const [shownQuestions, setShownQuestions] = useState([]);
    const [questionAmount, setQuestionAmount] = useState(2);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchChars, setSearchChars] = useState('');


    // Breakpoint between engaging search and displaying all answers
    const updateSearch = (e) => {
      setSearchChars(e.target.value);
      if (searchChars.length >= 3) {
          search(searchChars);
      } else {
        setShownQuestions(questions.slice(0, questionAmount));
      }
    }

    // Filters questions according to search params
    const search = (chars) => {
        let searched = questions.filter((question) => {
            return question.question_body.includes(chars);
        });
        setFilteredQuestions(searched);
        setShownQuestions(filteredQuestions);
      }

    // Handle submitting a question, posting to server
    const handleSubmitQues = (formData) => {
        API.POST_QA_QUESTION(formData).then((response) => {
            //console.log('Question submitted!', response);
            getAndSet();
        }).catch((error) => {
            console.log(error);
        });
    };

    // This is used to get questions from server and set them as state
    const getAndSet = () => {
        API.GET_QA_QUESTIONS(product.product_id, 1, 1000).then((response) => {
            setQuestions(response.data || []);
            setFilteredQuestions(questions);
            setShownQuestions(questions.slice(0, questionAmount));
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
            <h2 style={{'paddingTop': '25px'}}>QUESTIONS & ANSWERS</h2>
            <hr/>
            <Search search={search} updateSearch={updateSearch}/>
            <Questions product={product} shownQuestions={shownQuestions}/>
            <Stack style={{'paddingTop': '10px'}} direction="row" spacing={1}>
                {(questionAmount < questions.length && questions.length > 2) ?
                    <Button variant="outlined" onClick={seeMoreQuestions}>See more questions</Button> :
                    null
                }
                <AddQuestion product={product} handleSubmitQues={handleSubmitQues}/>
            </Stack>
            <hr/>
        </div>
    )
};

export default QuestionsAnswers;