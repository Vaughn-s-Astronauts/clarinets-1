import React, { useState, useEffect } from 'react';

let Answer = ({answer}) => {
    console.log('IS THIS GETTING PICKED UP??');

    return (
        <div>
            <p className='answer' >A: {answer.body}</p>
        </div>
    )
};

export default Answer;