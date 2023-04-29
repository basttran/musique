export type Note = {
  name: string;
  notation: string;
  octave: number;
  frequency: number;
};

export type AdjustedNote = {
  latine: string;
  notation: string;
  midi: string;
  octave: number;
  frequency: number;
  alt?: string;
};

export type ScaleName = 'maj' | 'minH' | 'minM' | 'minE';
export type ScaleMask = boolean[];

export type OctaveName = '-1' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type OctaveFactor = number;

export type Scales = Record<ScaleName, ScaleMask>;

export type Octaves = Record<OctaveName, OctaveFactor>;

export const scalesDictionary: Scales = {
  maj: [
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
  ],
  minH: [
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
  ],
  minM: [
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
  ],
  minE: [
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
  ],
};

const modeMaskFromScale = (mode: number, scale: ScaleMask): ScaleMask => {
  return [];
};

export const strings = ['E2', 'A3', 'D4', 'G4', 'B4', 'E5'];

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
    frequency: 294,
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
    frequency: 330,
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
    frequency: 392,
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
  },
];

export const steps = [
  7.346026311, 6.933721978, 6.544558708, 6.177237683, 5.83053298, 5.503287485,
  5.194409027, 4.902866735, 4.627687595, 4.367953207, 4.122796715, 3.891399919,
  3.67299054, 3.466839642, 3.272259205, 3.088599824, 2.91524854, 2.7516268,
  2.597188522, 2.451418273, 2.31382955, 2.183963156, 2.061385665, 1.945687979,
  1.836483962,
];

export const octaves: Octaves = {
  '-1': 0.125,
  '1': 0.25,
  '2': 0.5,
  '3': 1,
  '4': 2,
  '5': 4,
  '6': 8,
  '7': 1,
};

const semitones: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
type modeNames =
  | 'ionien'
  | 'dorien'
  | 'phrygien'
  | 'lydien'
  | 'mixolydien'
  | 'eolien'
  | 'locrien';
const modeMasks: Record<modeNames, ScaleMask> = {
  ionien: [
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
  ],
  dorien: [
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
  ],
  phrygien: [
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
  ],
  lydien: [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
  ],
  mixolydien: [
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
  ],
  eolien: [
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
  ],
  locrien: [
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
  ],
};

const twelthRootOfTwo = Math.pow(2, 1 / 12);

export const data = Object.keys(octaves)
  .map((key) => ({ name: key, factor: octaves[key as OctaveName] }))
  .map((octave, index) =>
    notes.map((note) => ({
      name: note.name + index,
      octave: octave.name,
      frequency: note.frequency * octave.factor,
    }))
  )
  .flat();

export const getAllNotes = (): Note[] =>
  Object.keys(octaves)
    .map((key) => ({ name: key, factor: octaves[key as OctaveName] }))
    .flatMap((octave) =>
      notes.map((note) => ({
        name: note.name,
        octave: parseInt(octave.name) > 0 ? parseInt(octave.name) : 0, // MEH
        notation: note.notation,
        frequency: note.frequency * octave.factor,
      }))
    )
    .sort((a, b) => a.octave - b.octave || a.frequency - b.frequency);

export const memoizedOctaveSemitonesFromFrequency = () => {
  let cache: Record<number, number[]> = {};
  return (frequency: number) => {
    if (cache[frequency]) {
      return cache[frequency];
    }
    cache[frequency] = semitones.map(
      (position) => frequency * Math.pow(twelthRootOfTwo, position)
    );
    return cache[frequency];
  };
};

export const getOctaveSemitonesFromFrequency =
  memoizedOctaveSemitonesFromFrequency();

export const memoizedScaleForNote = () => {
  let cache: Record<string, number[]> = {} as Record<ScaleName, number[]>;
  return (note: Note, scale: ScaleName) => {
    if (cache[scale + note.frequency]) {
      return cache[scale + note.frequency];
    }
    cache[scale + note.frequency] = getOctaveSemitonesFromFrequency(
      note.frequency
    ).filter((_semi, index) => scalesDictionary[scale][index]);
    return cache[scale + note.frequency];
  };
};

export const getScaleForNote = memoizedScaleForNote();

export const memoizedModesForScale = () => {
  let cache: Record<string, number[][]> = {} as Record<number, number[][]>;
  return (note: Note, scale: ScaleName) => {
    if (cache[scale + note.frequency]) {
      return cache[scale + note.frequency];
    }
    const modes = [0, 1, 2, 3, 4, 5, 6];

    cache[scale + note.frequency] = modes.map((mode) => {
      const notes = [...getScaleForNote(note, scale)];
      notes.pop();
      const newNotes = notes
        .slice(mode)
        .concat(notes.slice(0, mode).map((n) => n * 2));
      return newNotes;
    });
    return cache[scale + note.frequency];
  };
};

export const getModesForScale = memoizedModesForScale();

export const las = [27.5, 55, 110, 220, 440, 880, 1760, 3520];
export const adjustedNotes: AdjustedNote[] = las.flatMap((la, laIndex) =>
  [
    { midi: 'A', latine: 'La' },
    { midi: 'A#', latine: 'La#', alt: 'Si♭' },
    { midi: 'B', latine: 'Si' },
    { midi: 'C', latine: 'Do' },
    { midi: 'C#', latine: 'Do#', alt: 'Ré♭' },
    { midi: 'D', latine: 'Ré' },
    { midi: 'D#', latine: 'Ré#' },
    { midi: 'E', latine: 'Mi', alt: 'Mi♭' },
    { midi: 'F', latine: 'Fa' },
    { midi: 'F#', latine: 'Fa#', alt: 'Sol♭' },
    { midi: 'G', latine: 'Sol' },
    { midi: 'G#', latine: 'Sol#', alt: 'La♭' },
  ].map((position, index) => ({
    ...position,
    midi: position.midi + (index < 3 ? laIndex - 1 : laIndex),
    notation: position.midi,
    latine: position.latine + (index < 3 ? laIndex - 1 : laIndex),
    octave: index < 3 ? laIndex - 1 : laIndex,
    frequency: la * Math.pow(twelthRootOfTwo, index),
  }))
);

export const getScale = (note: AdjustedNote, scale: ScaleName) => {
  const noteIndex = adjustedNotes.findIndex((n) => n.latine === note.latine);
  return adjustedNotes
    .slice(noteIndex, noteIndex + 11)
    .map((n, index) => ({ ...n, isInScale: scalesDictionary[scale][index] }));
};

export const accordage = ['e5', 'B4', 'G4', 'D4', 'A3', 'E3'];

export const getModes = (
  note: AdjustedNote & { isInScale: boolean },
  scale: ScaleName
) => {
  const modes = [
    'ionien',
    'dorien',
    'phrygien',
    'lydien',
    'mixolydien',
    'eolien',
    'locrien',
  ];
  const baseScale = getScale(note, scale).filter((n) => n.isInScale);
  return modes.flatMap((mode, index) =>
    baseScale.slice(index).concat(baseScale.slice(0, index))
  );
};

export const guitare = accordage.map((openString) => {
  const openNote = adjustedNotes.findIndex(
    (note) => note.midi.toLocaleLowerCase() === openString.toLocaleLowerCase()
  );
  return adjustedNotes.slice(openNote, openNote + 24);
});
