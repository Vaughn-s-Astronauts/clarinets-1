import React, { useState, useEffect } from 'react';
import axios from 'axios';
import git_api from '../../../../../config.js';
import Answer from './Answer.jsx';

let Question = ({product, question, answers}) => {
    console.log('ANSWERS: ', answers);

    return (
        <div style={{border: '1px solid blue'}}>
            <p className='question '>Q: {question.question_body}</p>
            <Answer product={product} question={question}/>
            <p> by User1234 </p>
            <p> Helpful? Yes </p>
        </div>
    )
};

export default Question;