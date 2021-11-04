import React, { useState, useContext } from 'react'
import { InputBase, Paper, makeStyles, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ContextAPI from '../ContextAPI';

const AddCardOrListText = ({ setOpen, type, listId }) => {
  const [title, setTitle] = useState('')
  const classes = useStyle()
  const { addList, addCard } = useContext(ContextAPI)

  const handleAddCardOrList = () => {
    type ? addList(title) : addCard(title, listId)
    setTitle('')
    setOpen(false)
  }

  const handleRemoveCardOrList = () => {
    type ? addList(title) : addCard(title, listId)
    setTitle('')
    setOpen(true)
  }

  return (
    <>
      <Paper className={classes.card} onBlur={handleAddCardOrList}>
        <InputBase
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => setOpen(false)}
          multiline
          placeholder={`Enter a title for this ${type ? 'list' : 'card'}`}
          inputProps={{ className: classes.input }}
        />
      </Paper>
      <div className={classes.confirm}>
        <div className={classes.options}>
          <Button className={classes.btnConfirm}
            onClick={handleAddCardOrList}>Add {type ? 'list' : 'card'}</Button>
          <IconButton onClick={() => setOpen(false)}>
            <ClearIcon />
          </IconButton>
        </div>
        <IconButton>
          <span>...</span>
        </IconButton>
      </div>
    </>
  )
}

export default AddCardOrListText

const useStyle = makeStyles(theme => ({
  card: {
    minWidth: '280px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    padding: theme.spacing(1)
  },
  confirm: {
    display: 'flex',
    margin: theme.spacing(0, 1, 1, 1),
  },
  options: {
    flexGrow: 1,
  },
  btnConfirm: {
    background:  '#5aac44',
    color: '#fff',
    "&:hover": {
      backgroundColor: '#5aac44'
    }
  }
}))