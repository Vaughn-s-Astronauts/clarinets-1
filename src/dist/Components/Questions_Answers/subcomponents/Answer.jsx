import React, { useState, useEffect } from 'react';

let Answer = ({product, question}) => {
    console.log(question);

    return (
        <div style={{border: '1px solid blue'}}>
            <p className='question '>Q: {question.question_body}</p>
            <p className='answer '>A:  </p>
            <p> by User1234 </p>
            <p> Helpful? Yes </p>
        </div>
    )
};

export default Answer;