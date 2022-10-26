export type Note = {
  name: string;
  notation: string;
  octave: number;
  frequency: number;
}

export type ScaleName = 'maj' | 'minH' | 'minM' | 'minE';  
export type ScaleMask = boolean[];

export type OctaveName = '-1' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type OctaveFactor = number;

export type Scales = Record<ScaleName, ScaleMask>;  

export type Octaves = Record<OctaveName, OctaveFactor>;   

export const scalesDictionary: Scales = {
  maj: [true, false, true, false, true, true, false, true, false, true, false, true, true],
  minH: [true, false, true, true, false, true, false, true, true, false, false, true, true],
  minM: [true, false, true, true, false, true, false, true, false, true, false, true, true],
  minE: [true, false, true, true, false, true, false, true, true, false, true, false, true]
};

export const strings = 
  [
    'E2',
    'A3',
    'D4',
    'G4',
    'B4',
    'E5'
  ]

export const notes: Note[] = [
  {
    name: 'Do',
    notation: 'C',
    octave: 3,
    frequency: 262,
  },
  {
    name: 'Do#',
    notation: 'C#',
    octave: 3,
    frequency: 277,
  },
  {
    name: 'Ré',
    notation: 'D',
    octave: 3,
    frequency: 294
  },
  {
    name: 'Ré#',
    notation: 'D#',
    octave: 3,
    frequency: 311,
  },
  {
    name: 'Mi',
    notation: 'E',
    octave: 3,
    frequency: 330
  },
  {
    name: 'Fa',
    notation: 'F',
    octave: 3,
    frequency: 349,
  },
  {
    name: 'Fa#',
    notation: 'F#',
    octave: 3,
    frequency: 370,
  },
  {
    name: 'Sol',
    notation: 'G',
    octave: 3,
    frequency: 392
  },
  {
    name: 'Sol#',
    notation: 'G#',
    octave: 3,
    frequency: 415,
  },
  {
    name: 'La',
    notation: 'A',
    octave: 3,
    frequency: 440,
  },
  {
    name: 'La#',
    notation: 'A#',
    octave: 3,
    frequency: 466,
  },
  { 
    name: 'Si',
    notation: 'B',
    octave: 3,
    frequency: 494,
  }
];

export const steps = [
  7.346026311,
  6.933721978,
  6.544558708,
  6.177237683,
  5.83053298,
  5.503287485,
  5.194409027,
  4.902866735,
  4.627687595,
  4.367953207,
  4.122796715,
  3.891399919,
  3.67299054,
  3.466839642,
  3.272259205,
  3.088599824,
  2.91524854,
  2.7516268,
  2.597188522,
  2.451418273,
  2.31382955,
  2.183963156,
  2.061385665,
  1.945687979,
  1.836483962
];

export const octaves: Octaves = {
  '-1': 0.125,
  '1': 0.25,
  '2': 0.5,
  '3': 1,
  '4': 2,
  '5': 4,
  '6': 8,
  '7': 1
}

const semitones: number[] = [0, 1, 2, 3, 4 ,5 ,6 ,7, 8, 9, 10, 11, 12];
 
const twelthRootOfTwo = Math.pow(2, 1/12);

export const data = Object.keys(octaves).map(key => ({ name: key, factor: octaves[key as OctaveName]})).map((octave, index) => notes.map(note => ({
    name: note.name + index,
    octave: octave.name,
    frequency: note.frequency*octave.factor
  }))).flat()

export const getAllNotes = (): Note[] => Object.keys(octaves).map(key => ({ name: key, factor: octaves[key as OctaveName]})).flatMap((octave, index) => notes.map(note => ({
  name: note.name,
  octave: parseInt(octave.name) > 0 ? parseInt(octave.name) : 0,
  notation: note.notation,
  frequency: note.frequency*octave.factor
}))).sort((a,b) => a.frequency - b.frequency);


export const memoizedOctaveSemitonesFromFrequency = () => {
  let cache: Record<number, number[]> = {};
  return (frequency: number) => {
    if (cache[frequency]) {
      return cache[frequency];
    }
    cache[frequency] = semitones.map(position => frequency*(Math.pow(twelthRootOfTwo,position)));
    return cache[frequency];
  }
}

export const getOctaveSemitonesFromFrequency = memoizedOctaveSemitonesFromFrequency();

  export const memoizedScaleForNote = () => {
    let cache: Record<string, number[]> = {} as Record<ScaleName, number[]>;
    return (note: Note, scale: ScaleName) => {
      console.log({note, scale});
      if (cache[scale + note.frequency]) {
        return cache[scale + note.frequency];
      };
      cache[scale + note.frequency] = getOctaveSemitonesFromFrequency(note.frequency).filter((_semi, index) => scalesDictionary[scale][index]);
      return cache[scale + note.frequency];
    }
  }

  export const getScaleForNote = memoizedScaleForNote();
