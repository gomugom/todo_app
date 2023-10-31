import React, {useState} from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';

export default function App() {
  
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState('');

  // 구조분해
  var arr1 = [1,2,3,4,5];
  var [a, b, ...c] = arr1; // a =1, b =2, c = [3,4,5]

  return(
    <>
      <div className='flex items-center justify-center w-screen h-screen bg-blue-100'>
        <div className='w-full p-0 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg'>

          <div className='flex justify-between mb-3'>
            <h1>할 일 목록</h1>
          </div>

          <List todoData={todoData} setTodoData={setTodoData} />          

          <Form value={value}
                setTodoData={setTodoData}
                setValue={setValue} />

        </div>  
      </div>     
    </>
  );
  
};
