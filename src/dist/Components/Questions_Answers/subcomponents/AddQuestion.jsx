import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import API from '../../../helpers/API.js';

let AddQuestion = ({ product, handleSubmitQues }) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    product_id: product.id,
  })

  // Handling opening and closing modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handling adding a question via post to server
  const addQuestion = () => {
    if (!formData.body || !formData.name || !formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Error submitting, please recheck entries');
    } else {
      handleSubmitQues(formData);
      handleClose();
    }
  };

  return (
    <div>
      <button onClick={handleClickOpen}>
        Add Question
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ask Your Question about the {product.name}</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            multiline
            maxRows={4}
            margin="dense"
            id="question"
            label="Your Question"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 1000 }}
            onChange={e => setFormData({...formData, body: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            id="nickname"
            label="Nickname"
            placeholder="Example: jackson11!"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 60 }}
            onChange={e => setFormData({...formData, name: e.target.value})}
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
            placeholder="Why did you like the product or not?"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 60 }}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
            <DialogContentText>
              <i style={{'fontSize': '12px'}}> For authentication reasons, you will not be emailed. </i>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addQuestion}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddQuestion;