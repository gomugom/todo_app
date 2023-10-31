import React from 'react'

export default function Form({value, setTodoData, setValue}) {
  
    const handleChangeTxt = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newTodoData = {
            id: Date.now(),
            title: value,
            completed: false
        }
            
        setTodoData((prevData) => [...prevData, newTodoData]);
        setValue('');

    };

    
    
  return (
    <>
        <form onSubmit={handleSubmit} className='flex pt-2'>
            <input type="text" className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow' value={value} onChange={handleChangeTxt} placeholder='해야 할 일을 입력하세요.'/>
            <input type="submit" className='p-2 text-blue-400 border-2 border-blue-100 rounded hover:text-white hover:bg-blue-200' value="입력"></input>
        </form>
    </>
  );
  
}
