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

/*
  [ React의 불변성 ]
  : React는 "변했을 때"만 rerendering을 하게 되어있음
  -> 기본타입 : Boolean, String, number 등은 값을 재할당해주면 새로운 메모리를 할당받기 때문에 새로운 값으로 자동으로 인식
  -> 참조타입 : Array, Object 등은 stack에 주소가 저장되고 힙에 내용이 저장되어 기존 주소에 내용이 반영되더라도 "변함"으로 인정되지 않음
      --> 따라서, rerendering이 이루어지지 않음

  -> Array의 경우 (push, splice) 두 메서드는 원본 데이터 자체에 영향을 줘 내용이 변하지 않아 rerendering이 이루어지지 않음
  -> map, filter, slice, spread operation(...) 을 사용해서 새로운 값으로 바꿔 setState 해주도록한다.(rerendering가능하도록...)
  ex)
    var arr1 = [1,2,3];
    arr1.push(4); 
    setArr1(arr1); // rerendering x

    var arr2 = [1,2,3];
    setArr2((prev) => [...prev, 4]); // 새로운 값으로 인식
*/ 

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
