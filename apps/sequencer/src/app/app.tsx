import { useEffect, useState } from 'react';
import { Todo } from '@musique/data'
import { Todos } from '@musique/ui';


export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((_) => _.json())
      .then(setTodos);
  }, []);

  const addTodo = () => {
    fetch('/api/addTodo', {
      method: 'POST',
      body: '',
    })
      .then((_) => _.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      });
  }

  // const addPatternToSequence = () => {
    // fetch('/api/pattern', {
    //   method: 'POST',
    //   body: '',
    // })
    //   .then((_) => _.json())
    //   .then((newPattern) => {
    //     setPatterns([...patterns, newPattern]);
    //   });
  // }

  // const addSequenceToUserCollection = () => {
    // fetch('/api/addSequence', {
    //   method: 'POST',
    //   body: '',
    // })
    //   .then((_) => _.json())
    //   .then((newSequence) => {
    //     setSequences([...sequences, newsequence]);
    //   });
  // }

  return (
    <>
      <h1>Todos</h1>
      <Todos todos={todos} />
      <button id={'add-todo'} onClick={addTodo}>
      Add Todo
      </button>

    </>
  );
};

export default App;