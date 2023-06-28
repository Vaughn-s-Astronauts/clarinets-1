import React, { useState, useEffect } from 'react';
import UploadPic from './UploadPic.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Answer from './Answer.jsx';
import API from '../../../helpers/API.js';

let Question = ({product, question}) => {
    const [answers, setAnswers] = useState([]);
    const [shownAnswers, setShownAnswers] = useState([]);
    const [answerAmount, setAnswerAmount] = useState(2);
    const [helpfulQ, setHelpfulQ] = useState(question.question_helpfulness);
    const [votedQ, setVotedQ] = useState(false);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState({ preview: "", raw: "" });
    let id = question.question_id;

    const handleChange = (e) => {
      if (e.target.files.length) {
        setImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        });
      }
    };

    const handleUpload = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image.raw);

      await fetch("YOUR_URL", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData
      });
    };

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

    const handleOpen = (e) => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div style={{'border': '2px solid pink'}}>
            <div>
                <p style={{'fontSize': '18px', 'fontWeight': 'bold'}}>Q: {question.question_body}</p>
                <div style={{'display': 'flex', 'fontSize': '12px', 'float': 'right'}}>
                    <p style={{'marginRight': '3px'}}>Helpful?</p>
                    <u style={{'cursor': 'pointer'}} onClick={handleHelpfulQ}>Yes</u>
                    <p style={{'marginRight': '15px'}}>({helpfulQ})</p>
                    <p style={{'marginRight': '15px'}}>|</p>
                    <u style={{'cursor': 'pointer'}} onClick={handleOpen}>Add Answer</u>
                </div>
            </div>
            <div style={{'display': 'flex', 'maxHeight': '50%', 'overflow': 'auto'}}>
                {shownAnswers.length > 0 ?
                    <p style={{'fontSize': '18px', 'fontWeight': 'bold'}}>A: </p> :
                    <i style={{'fontSize': '12px', 'float': 'right'}}>No answers to display</i>
                }
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submit Your Answer</DialogTitle>
                <DialogContent>
                <DialogContentText margin="dense">
                    {product.name}: {question.question_body}
                </DialogContentText>
                <TextField
                    required
                    autoFocus
                    multiline
                    maxRows={4}
                    margin="dense"
                    id="question"
                    label="Your Answer"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 1000 }}
                />
                <TextField
                    required
                    margin="dense"
                    id="nickname"
                    label="Nickname"
                    placeholder="Example: jack543!"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 60 }}
                />
                <DialogContentText>
                <i style={{'fontSize': '12px'}}> For privacy reasons, do not use your full name or email address. </i>
                </DialogContentText>
                <TextField
                    required
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Example: jack@email.com"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 60 }}
                />
                <DialogContentText>
                <i style={{'fontSize': '12px'}}> For authentication reasons, you will not be emailed. </i>
                </DialogContentText>
                <UploadPic image={image} handleChange={handleChange} handleUpload={handleUpload}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default Question;