import React, { useState } from 'react'

const ListItem = React.memo(({snaphost, provided, data, todoData, setTodoData}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(data.title);

    const onCancelClick = React.useCallback((id) => {
        let newTodoData = todoData.filter(e => e.id !== id);
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
    }, [todoData]);

    const changeChkBox = React.useCallback((id) => {
        let changedTodoData = todoData.map(e => {
            if(e.id === id) {
                e.completed = !e.completed;
            }
            return e;
        });
        setTodoData(changedTodoData);
        localStorage.setItem('todoData', JSON.stringify(changedTodoData));
    }, [todoData]);

    const handleChangeEditTitle = (e) => {
        setEditTitle(e.target.value);
    }

    const handleEditSubmit = React.useCallback((e) => {

        e.preventDefault(); // form submit시 reload되지 않게
        
        let newTodoData = todoData.map(e => {
            if(e.id === data.id) {
                e.title = editTitle;
            }
            return e;
        });

        setTodoData(newTodoData);

        localStorage.setItem('todoData', JSON.stringify(newTodoData));
        
        setIsEditing(false);

    }, [todoData, isEditing]);

    if(isEditing) {
        return (
            <div className='todoItemBox' key={data.id}>
                <div className={`flex items-center w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 rounded`}>
                    <form onSubmit={handleEditSubmit}>
                        <div className='items-center flex-initial'>
                        
                            <input 
                                type="text" 
                                value={editTitle} 
                                className='w-full px-3 py-2 mr-4 text-gray-500 rounded'
                                onChange={handleChangeEditTitle}
                            />    
                    
                        </div>   
                    
                        <div className='items-center'>
                            <button className='px-4 py-2 float-right flex-initial' onClick={() => setIsEditing(false)}>x</button>
                        </div>
                        <button type='submit'>Save</button>
                    </form>
                    
                </div>
    
            </div>
        );
    } else {
        
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps} 
                className='todoItemBox' key={data.id}>
                <div className={`${true ? "bg-gray-100" : "bg-gray-100"} flex items-center w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 rounded`}>
                    <div className='items-center flex-initial'>
                        <input type="checkbox" checked = {data.completed} onChange={() => changeChkBox(data.id)} value={data.completed} />
                    </div>   
                
                    <div className={data.completed ? "line-through" : ''}>{data.title}</div>
                    <div className='items-center'>
                        <button className='px-4 py-2 float-right flex-initial' onClick={() => onCancelClick(data.id)}>x</button>
                    </div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    
                </div>
    
            </div>
        );

    }

});

export default ListItem;


