import { getModesForScale, Note, ScaleName, scalesDictionary, adjustedNotes, AdjustedNote, guitare, playNote, getScaleForNote, notes, ScaleMask, steps } from '@musique/audio';
import { useEffect, useState } from 'react';
import styles from './notes.module.css'; 


const isInScale = (notation: string, mask: ScaleMask, startNote: Note) => {
  const start = notes.findIndex(note => note.frequency === startNote.frequency)
  const allowedNotes = notes.slice(start, notes.length).concat(notes.slice(0, start)).filter((_note, index) => mask[index % 12]).map((note: Note) => note.notation);

  return allowedNotes.includes(notation);
}

export const NotesList = () => {
  const stepsPercent = steps.map(step => (step - 0.0000000001) + '%');
  console.log('stepsPercent: ', stepsPercent);
  const listAudioCtx = new(window.AudioContext)();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentScale, setCurrentScale] = useState<ScaleName>('maj');
  const [currentNote, setCurrentNote] = useState<Note>(  {
    name: 'Do',
    notation: 'C',
    octave: 3,
    frequency: 262,
  });
  useEffect(() => {
    (async () => {
      const fetchedNotes = await fetch('/api/notes', { method: 'GET'});
      const notes = await fetchedNotes.json();
      setNotes(notes as unknown as Note[]);
    })();
    return () => {};
  }, []);

  return (
    <>
      <div
        className={styles['fretboard']}
      >
        { guitare.map((guitarString, stringIndex) => (
          <ul
            className={styles['guitar-string']}
          >
            {guitarString.map((fret, fretIndex) => (
              <li
                key={fret.frequency + currentNote.notation + currentNote.octave}
                onMouseOver={
                  isInScale(fret.notation, scalesDictionary[currentScale], currentNote) ?
                  () => playNote(fret.frequency, 1, listAudioCtx):
                  () => {}
                }
                className={
                  styles['fret']
                }
                style={{width: `${stepsPercent[fretIndex]}`}}
              >
                { isInScale(fret.notation, scalesDictionary[currentScale], currentNote) && (
                  <div
                  className={styles['marker']}

                  style={{color: `${fretIndex % 2 === 0 ? 'magenta': 'chartreuse'}`}}>
                    <span style={{verticalAlign: `middle`}}>
                     { fret.notation }
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ))}

      </div>
      <h2>{ `${currentNote.notation} - ${currentScale}` }</h2>
      <ul>
        {Object.keys(scalesDictionary).map(scale => (  
          <li
           key={scale}
           onClick={() => {setCurrentScale(scale as ScaleName)}}
          >
            {scale}
          </li>
        ))}
      </ul>
      <ul>
        {notes.slice(36, 48).map(note => (  
          <li
           key={note.frequency}
           onClick={() => {setCurrentNote(note as Note)}}
          >
            {note.name}
          </li>
        ))}
      </ul>
    </>
  );
}
