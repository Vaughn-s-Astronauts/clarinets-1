import React, { useState, useEffect } from 'react';
import API from '../../../helpers/API.js';

let Answer = ({answer}) => {
    const [helpful, setHelpful] = useState(answer.helpfulness);
    const [voted, setVoted] = useState(false);
    const [reported, setReported] = useState(false);

    console.log(answer, 'answer!!!')

    // Formats date to specs
    const date = new Date(answer.date);
    let editedDate = date.toDateString().slice(4).split('');
    let moreEditedDate = editedDate.splice(-5, 0, ',');

    // Sends put request to increment helpful counter when clicked
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

    // Sends a put request to flag the answer as reported
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
            <div>
                <p style={{'fontSize': '15px', 'marginLeft': '5px'}} >{answer.body}</p>
            </div>
            <div style={{'display': 'flex', 'fontSize': '12px', 'marginLeft': '5px'}}>
                {answer.answerer_name === 'Seller' ?
                    <p style={{'marginRight': '15px'}}>by <b>{answer.answerer_name}</b>, {editedDate}</p> :
                    <p style={{'marginRight': '15px'}}>by {answer.answerer_name}, {editedDate}</p>}
                <p style={{'marginRight': '15px'}}>|</p>
                <p style={{'marginRight': '3px'}}>Helpful?</p>
                <u style={{'cursor': 'pointer'}} onClick={handleHelpful}>Yes</u>
                <p style={{'marginRight': '15px'}}>({helpful})</p>
                <p style={{'marginRight': '15px'}}>|</p>
                <>
                    {
                    reported ?
                    <p>Reported </p> :
                    <u style={{'cursor': 'pointer'}} onClick={handleReported}>Report</u>
                    }
                </>
                <div>
                    {answer.photos.map((photo, i) => {
                        return <span key={i}>
                        <img src={photo.url} width="64"></img>
                        </span>
                    })}
                </div>
            </div>
        </div>
    )
};

export default Answer;