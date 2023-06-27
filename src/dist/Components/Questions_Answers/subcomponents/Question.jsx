import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import API from '../../../helpers/API.js';

let Question = ({question}) => {
    const [answers, setAnswers] = useState([]);
    const [shownAnswers, setShownAnswers] = useState([]);
    const [answerAmount, setAnswerAmount] = useState(2);
    let id = question.question_id;

    React.useEffect(() => {
        API.GET_QA_QUESTION_ANSWERS(id).then((response) => {
            setAnswers(response.data.results);
            setShownAnswers(response.data.results.slice(0, 2));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

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
        <div style={{border: '1px solid blue'}}>
            <p style={{'fontSize': '18px', 'fontWeight': 'bold'}}>Q: {question.question_body}</p>
            <div style={{'display': 'flex'}}>
                {shownAnswers.length > 0 ? <p style={{'fontSize': '18px', 'fontWeight': 'bold'}}>A: </p> : null}
                <div style={{'maxHeight': '50%', 'overflow': 'auto'}}>
                    {shownAnswers.map((answer, i) => {
                        return <Answer key={i} answer={answer} />
                    })}
                    {(answerAmount < answers.length && answers.length > 2) ?
                        <button onClick={seeMoreAnswers}>See more answers</button> :
                        <button onClick={collapseAnswers}>Collapse answers</button>
                    }
                </div>
            </div>
        </div>
    )
};

export default Question;