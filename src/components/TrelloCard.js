import React from 'react'
import { makeStyles, Paper } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'

const TrelloCard = ({ card, index }) => {
  const classes = useStyle()
  return (
    <Draggable draggableId={card.id} index={index}>
      {
        (provided) => (
          <div ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}>
            <Paper className={classes.trelloCard}>
              <h4>{card.title}</h4>
              <h5>Створено: {card.datetime}</h5>
            </Paper>
          </div>
        )
      }
    </Draggable>
  )
}

export default TrelloCard

const useStyle = makeStyles(theme => ({
  trelloCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2, 1, 2)
  }
}))