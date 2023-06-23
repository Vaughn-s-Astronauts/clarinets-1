import React, { useState, useEffect } from 'react';
import axios from 'axios';
import git_api from '../../../../../config.js';

let Answer = ({product, question, answers}) => {
  console.log(answers.body);


    return (
        <div>
            <p className='answer '>A: {}</p>
        </div>
    )
};

export default Answer;