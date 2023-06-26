import React, { useState, useEffect } from 'react';

let Answer = ({answer}) => {

    return (
        <div>
            <p className='answer' >A: {answer.body}</p>
        </div>
    )
};

export default Answer;