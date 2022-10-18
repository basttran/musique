export const scales = {
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

export const notes = [
  {
    name: 'Do',
    notation: 'C',
    octave: 4,
    frequency: 262,
  },
  {
    name: 'Do#',
    notation: 'C#',
    octave: 4,
    frequency: 277,
  },
  {
    name: 'Ré',
    notation: 'D',
    octave: 4,
    frequency: 294
  },
  {
    name: 'Ré#',
    notation: 'D#',
    octave: 4,
    frequency: 311,
  },
  {
    name: 'Mi',
    notation: 'E',
    octave: 4,
    frequency: 330
  },
  {
    name: 'Fa',
    notation: 'F',
    octave: 4,
    frequency: 349,
  },
  {
    name: 'Fa#',
    notation: 'F#',
    octave: 4,
    frequency: 370,
  },
  {
    name: 'Sol',
    notation: 'G',
    octave: 4,
    frequency: 392
  },
  {
    name: 'Sol#',
    notation: 'G#',
    octave: 4,
    frequency: 415,
  },
  {
    name: 'La',
    notation: 'A',
    octave: 4,
    frequency: 440,
  },
  {
    name: 'La#',
    notation: 'A#',
    octave: 4,
    frequency: 466,
  },
  { 
    name: 'Si',
    notation: 'B',
    octave: 4,
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

export const octaves = [
  0.0625,
  0.125,
  0.25,
  0.5,
  1,
  2,
  4,
  8,
  16
]

export const data = octaves.map((octave, index) => notes.map(note => ({
    name: note.name + index,
    octave: index,
    frequency: note.frequency*octave
  }))).flat()
