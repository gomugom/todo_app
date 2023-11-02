import React from 'react'

const ListItem = React.memo(({provided, data, todoData, setTodoData}) => {
    console.log('Item Component');

    const onCancelClick = React.useCallback((id) => {
        let newTodoData = todoData.filter(e => e.id !== id);
        setTodoData(newTodoData);
    }, [todoData]);

    const changeChkBox = React.useCallback((id) => {
        let changedTodoData = todoData.map(e => {
            if(e.id === id) {
                e.completed = !e.completed;
            }
            return e;
        });
        setTodoData(changedTodoData);
    }, [todoData]);

    return (
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
});

export default ListItem;


