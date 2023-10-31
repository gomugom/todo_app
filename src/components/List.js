import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function List({ todoData, setTodoData }) { // props
    
    const onCancelClick = (id) => {
        let newTodoData = todoData.filter(e => e.id !== id);
        setTodoData(newTodoData);
    }

    const changeChkBox = (id) => {
        let changedTodoData = todoData.map(e => {
        if(e.id === id) {
            e.completed = !e.completed;
        }
        return e;
        });
        setTodoData(changedTodoData);
    }

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
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} 
                                                            className='todoItemBox' key={data.id}>
                                                            <div className='flex items-center w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 rounded'>
                                                                <div className='items-center flex-initial'>
                                                                    <input type="checkbox" checked = {data.completed} onChange={() => changeChkBox(data.id)} value={data.completed} />
                                                                </div>   
                                                            
                                                                <div className={data.completed ? "line-through" : ''}>{data.title}</div>
                                                                <div className='items-center'>
                                                                    <button className='px-4 py-2 float-right flex-initial' onClick={() => onCancelClick(data.id)}>x</button>
                                                                </div>
                                                                
                                                            </div>
                                                    
                                                        </div>
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
