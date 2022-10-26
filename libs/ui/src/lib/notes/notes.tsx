import { getAllNotes, getScaleForNote, Note, playNote, ScaleName, scalesDictionary } from '@musique/audio';
import { useState } from 'react';

export const NotesList = () => {
  const listAudioCtx = new(window.AudioContext)();
  const [currentScale, setCurrentScale] = useState<ScaleName>('maj');
  const [currentNote, setCurrentNote] = useState<Note>({
    name: 'La',
    notation: 'A',
    octave: 3,
    frequency: 440,
  });

  return (
    <>
      <ul>
        {Object.keys(scalesDictionary).map(scale => (
          
          <li
           onClick={() => {setCurrentScale(scale as ScaleName)}}
          >
            {scale}
          </li>
        ))}

      </ul>
      <ul>
        {getScaleForNote(currentNote, currentScale).map(frequency => (
          <li
            onMouseOver={() => playNote(frequency, 1, listAudioCtx)}
          >
            { frequency }
          </li>
        ))}
      </ul>
      <ul>
        {getAllNotes().map((note) => (
          <li
            onClick={() => setCurrentNote(note as Note)}
            className={'note'}
          >
            {note.notation} ({note.octave})
          </li>
        ))}
      </ul>
    </>
  );
}
