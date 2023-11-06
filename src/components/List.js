import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListItem from './ListItem';

// ==> React.memo() : 연관성 없는 Component까지 ReRendering되는 것을 막아주는 역할
const List = React.memo(({ todoData, setTodoData }) => { // props

    /*
        [ React.useCallback() ]
        : React에서 메서드는 컴포넌트가 ReRendering될 때마다 재생성된다.
        이때, 부모에서 자식컴포넌트로 메서드를 전달하게 될 경우 부모의 메서드가 매번 재생성됨으로
        자식컴포넌트 또한 자동으로 rerendering이 발생하게 된다.

        따라서, useCallback을 사용하면 "의존성 변수"값의 불변성이 바끼는 경우에만 함수를 재생성되게 할 수 있다.

        useCallback(익명함수, [의존성변수1,2,...])

        -> 의존성 변수를 넣지 않을경우 컴포넌트 최초에만 메서드가 생성되고 그 이후에는 재생성되지 않는다.
    */
    const onDragEnd = React.useCallback((result) => {
        // dropped outside the list
        if(!result.destination) return;

        const stIdx = result.source.index;
        const endIdx = result.destination.index;

        let todoTempData = todoData;

        let [removedItem] = todoTempData.splice(stIdx, 1);

        todoTempData.splice(endIdx, 0, removedItem);

        setTodoData(todoData);

    }, [todoData]);

    const sum = (a, b) => {
        return a + b;
    }


    /*
        [ useMemo ] : Memonization
        : 동일한 파라미터일 경우 동일한 결과를 응답하는 메서드의 경우 매번 재계산을 하게될 경우 효율적이지 못하다.
        따라서 동일 파라미터일 경우 캐싱해놓은 결과를 바로 응답하도록 할 수 있는데 이때 사용하는 것이 "useMemo"이다.

        useMemo(익명함수, [익명함수에서 참조하는 변수값])
    */
    const useMemoTest = (a, b) => {
        var result = React.useMemo(() => sum(a, b), [a,b]);
    }

    /*
        React.memo => 쓸대없는 컴포넌트의 ReRendering 방지
        React.useCallback(익명함수, [의존성변수]) => 함수가 재실행되지 않아도 되는 경우 재실행되지 않도록함
        React.useMemo(익명함수, [메서드에서 참조하는 변수들]) => 동일 파라미터 전달시 캐싱해놓은 동일 결과값을 전달하도록하는 기능.
    */

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
                                                        <ListItem snapshot={snapshot} provided={provided} data={data} todoData={todoData} setTodoData={setTodoData} />
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
});

export default List;

