import React, { useState, useContext } from 'react'
import { Typography, makeStyles } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import ContextAPI from '../ContextAPI';

const ListTitle = ({ title, listId }) => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const { updateListTitle } = useContext(ContextAPI)

  const handleBlur = () => {
    updateListTitle(newTitle, listId)
    setOpen(false)
  }

  return (
    <>
      {open ?
        <InputBase value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          fullWidth
          inputProps={{ className: classes.input }}
          />
      : (
        <div className={classes.title}>
          <Typography className={classes.titleText} onClick={() => setOpen(true)}>
            {title}
          </Typography>
          <span>...</span>
        </div>
      )}
    </>
  )
}

export default ListTitle

const useStyle = makeStyles(theme => ({
  title: {
    display: 'flex',
    margin: theme.spacing(1)
  },
  titleText: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1),
    "&:focus": {
      background: '#fff',
      border: '2px solid #226ffd',
      borderRadius: '5px',
    }
  }
}))
