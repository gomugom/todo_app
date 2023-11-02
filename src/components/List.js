import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListItem from './ListItem';

export default function List({ todoData, setTodoData }) { // props

    const onDragEnd = (result) => {
        // dropped outside the list
        if(!result.destination) return;

        const stIdx = result.source.index;
        const endIdx = result.destination.index;

        let todoTempData = todoData;

        let [removedItem] = todoTempData.splice(stIdx, 1);

        todoTempData.splice(endIdx, 0, removedItem);

        setTodoData(todoData);

    }

    return (
        <div>
            {
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable'>
                        {
                            (provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        todoData.map((data, idx) => 
                                            <Draggable key={data.id} draggableId={data.id + ""} index={idx}>
                                                {
                                                    (provided, snapshot) => (
                                                        <ListItem provided={provided} data={data} todoData={todoData} setTodoData={setTodoData} />
                                                    )
                                                }
                                            </Draggable>
                                            
                                        )
                                    }
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>

            }
        </div>
    )
}
