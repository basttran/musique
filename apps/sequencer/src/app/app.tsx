import { NotesList } from '@musique/ui'


export const App = () => {

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
      <h1>Notes</h1>
      <NotesList></NotesList>
    </>
  );
};

export default App;