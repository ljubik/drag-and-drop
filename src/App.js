import "./App.css";
import { useState } from 'react';
import db from "./db/db.json";
import TrelloList from './components/TrelloList';
import { makeStyles } from '@material-ui/core';
import AddCardOrList from './components/AddCardOrList';
import mockData from './mockData';
import ContextAPI from './ContextAPI';
import uuid from 'react-uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


function App() {
  const classes = useStyle()
  const [data, setData] = useState(db)

  const updateListTitle = (updatedTitle, listId) => {
    const list = data.lists[listId]
    list.title = updatedTitle
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
    console.log("updateListTitle")
  }

  const addCard = (title, listId) => {
    const newCardId = uuid()
    const datetime = new Date().toLocaleTimeString()
    const newCard = {
      id: newCardId,
      title,
      datetime
    }
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]

    // setData({
    //   ...data,
    //   lists: {
    //     ...data.lists,
    //     [listId]: list
    //   }
    // })
        setData({
      listIds: [...data.listIds],
      lists: {
        ...data.lists,
        [listId]: list
      },
    })
    console.log("addCard")
  }

const delCard = (data) => {
 const newStartCardIds = data.CardIds;
    newStartCardIds.splice(data.index, 1);
    const newCardIds = {
      ...data,
      cardIds: newStartCardIds
    }
    console.log("delete Card", data)
}
  
const delList = (data) => {
 const newStartListIds = data.listIds;
    newStartListIds.splice(data.index, 1);
    const newListIds = {
      ...data,
      listIds: newStartListIds
    }
    console.log("delete List", data)
  }

  const addList = (title) => {
    const newListId = uuid()
    const newList = {
      id: newListId,
      title,
      cards: []
    }
    
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList
      },
    })
    console.log("addList")
  }

  const onDragEnd = (result) => {
    const { destination, destination: { droppableId: destDroppableId, index : destIndex }, source, source: { droppableId: srcDroppableId, index: srcIndex }, draggableId, type } = result;
    // console.table([{ draggableId, srcDroppableId, destDroppableId }])
    // console.table([{ type, srcIndex, destIndex }])
    console.log(type, srcIndex, destIndex)
    console.log(draggableId, srcDroppableId, destDroppableId)

    if (!destination) return;
    if (type === "list") {
      const newListIds = data.listIds
      newListIds.splice(srcIndex, 1)
      newListIds.splice(destIndex, 0, draggableId)
      return;
    }

    const srcList = data.lists[srcDroppableId]
    const destList = data.lists[destDroppableId]
    const dragginCard = srcList.cards.filter(card => card.id === draggableId)[0]

    if (srcDroppableId === destDroppableId) {
      srcList.cards.splice(srcIndex, 1)
      destList.cards.splice(destIndex, 0, dragginCard)
    }
  }

 const moveTaskToDifferentList = (start, finish, source, destination, draggableId) => {
    // remove task from start tasks
    const newStartTaskIds = start.taskIds;
    newStartTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      taskIds: newStartTaskIds
    }
  
    // add task to finish tasks
    const newFinishTaskIds = finish.taskIds;
    newFinishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn  = {
      ...finish,
      taskIds: newFinishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn
      },
    };

    this.setState(newState);
  }

function getRnd(max) {
  return Math.floor(Math.random() * max);
}

  return (
    <ContextAPI.Provider value={{ updateListTitle, addCard, addList }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"list"+(getRnd(100))} type="list" direction="horizontal">
          {
            (provided) => (
              <div className={classes.root} ref={provided.innerRef} {...provided.droppableProps}>
                <div className={classes.container}>
                    {data.listIds.map((listID, index) => {
                      const list = data.lists[listID]
                      return <TrelloList key={listID} list={list} index={index} />
                    })}
                  <div>
                    <AddCardOrList type="list" />
                    {provided.placeholder}
                  </div>
                </div>
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </ContextAPI.Provider>
  );
}

export default App;

const useStyle = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    overflowY: 'auto',
    backgroundImage: `url(/images/laptop.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    display: 'flex',
  }
}))
