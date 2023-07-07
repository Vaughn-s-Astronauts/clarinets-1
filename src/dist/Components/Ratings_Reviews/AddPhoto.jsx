import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let AddPhoto = ({photos, addPhotoURL}) => {

  const [open, setOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState('');


  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    if (e.target.name === 'add') {
      addPhotoURL(currentPhoto);
    }
    setOpen(false);
  }

  const handleChange = (e) => {
    setCurrentPhoto(e.target.value);
  }

  return (
    <div>
      {photos.length < 5 && <Button variant="outlined" onClick={handleOpen}>ADD A PHOTO</Button>}
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Add Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the photo url below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Photo Url"
            type="url"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button name="cancel" onClick={handleClose}>Cancel</Button>
          <Button name="add" onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPhoto;