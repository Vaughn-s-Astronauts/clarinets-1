import React, { useState, useEffect } from 'react';
import API from '../../../helpers/API.js';

let Answer = ({answer}) => {
    const [helpful, setHelpful] = useState(answer.helpfulness);
    const [voted, setVoted] = useState(false);
    const [reported, setReported] = useState(false);

    const handleHelpful = () => {
        if (!voted) {
            API.PUT_QA_ANSWER_HELPFUL(answer.answer_id).then((response) => {
            setHelpful(helpful + 1);
            }).catch((error) => {
                console.log(error);
            });
            setVoted(true);
        }
    };

    const handleReported = () => {
        if (!reported) {
            API.PUT_QA_ANSWER_REPORT(answer.answer_id).then((response) => {
            // Do nothing
            }).catch((error) => {
                console.log(error);
            });
            setReported(true);
        }
    };

    return (
        <div>
            <p className='answer' >A: {answer.body}</p>
            <div style={{'display': 'flex', 'fontSize': '12px'}}>
                <p style={{'marginRight': '15px'}}>by {answer.answerer_name}, {answer.date}</p>
                <p style={{'marginRight': '15px'}}>|</p>
                <p style={{'marginRight': '10px'}}>Helpful?</p>
                <u style={{'marginRight': '2px'}} onClick={handleHelpful}>Yes</u>
                <p style={{'marginRight': '15px'}}>({helpful})</p>
                <p style={{'marginRight': '15px'}}>|</p>
                <>
                    {
                    reported ?
                    <p>Reported </p> :
                    <u onClick={handleReported}>Report</u>
                    }
                </>
            </div>
        </div>
    )
};

export default Answer;