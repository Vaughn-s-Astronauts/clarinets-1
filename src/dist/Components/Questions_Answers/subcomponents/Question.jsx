import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import API from '../../../helpers/API.js';

let Question = ({question}) => {
    const [answers, setAnswers] = useState([]);
    const [shownAnswers, setShownAnswers] = useState([]);
    const [answerAmount, setAnswerAmount] = useState(2);
    const [helpfulQ, setHelpfulQ] = useState(question.question_helpfulness);
    const [votedQ, setVotedQ] = useState(false);
    let id = question.question_id;

    React.useEffect(() => {
        API.GET_QA_QUESTION_ANSWERS(id).then((response) => {
            setAnswers(response.data.results);
            setShownAnswers(response.data.results.slice(0, 2));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleHelpfulQ = () => {
        if (!votedQ) {
            API.PUT_QA_QUESTION_HELPFUL(id).then((response) => {
            setHelpfulQ(helpfulQ + 1);
            }).catch((error) => {
                console.log(error);
            });
            setVotedQ(true);
        }
    };

    const seeMoreAnswers = () => {
        setAnswerAmount(answers.length);
    }

    const collapseAnswers = () => {
        setAnswerAmount(2);
    }

    React.useEffect(() => {
        setShownAnswers(answers.slice(0, answerAmount));
    }, [answerAmount]);

    return (
        <div style={{'border': '2px solid pink'}}>
            <div>
                <p style={{'fontSize': '18px', 'fontWeight': 'bold'}}>Q: {question.question_body}</p>
                <div style={{'display': 'flex', 'fontSize': '12px', 'float': 'right'}}>
                    <p style={{'marginRight': '3px'}}>Helpful?</p>
                    <u style={{'cursor': 'pointer'}} onClick={handleHelpfulQ}>Yes</u>
                    <p style={{'marginRight': '15px'}}>({helpfulQ})</p>
                    <p style={{'marginRight': '15px'}}>|</p>
                    <u style={{'cursor': 'pointer'}}>Add Answer</u>
                </div>
            </div>
            <div style={{'display': 'flex', 'maxHeight': '50%', 'overflow': 'auto'}}>
                {shownAnswers.length > 0 ? <p style={{'fontSize': '18px', 'fontWeight': 'bold'}}>A: </p> : <i style={{'fontSize': '12px', 'float': 'right'}}>No answers to display</i>}
                <div>
                    {shownAnswers.map((answer, i) => {
                        return <Answer key={i} answer={answer} />
                    })}
                    {(answerAmount < answers.length) ?
                        <button onClick={seeMoreAnswers}>See more answers</button> :
                        answers.length < 2 ?
                        null :
                        <button onClick={collapseAnswers}>Collapse answers</button>
                    }
                </div>
            </div>
        </div>
    )
};

export default Question;