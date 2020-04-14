/*
lists will contain ALL stimulus lists (the correct one is chosen automatically for each participant)
enter one list per [ ] entry in lists, as seen below, with a corresponding stimulusList parameter

stimulusList contains test trials as well as target trials. this is implented via blocks. Block0 will be handled as test trials.

column descriptors:
0: list number
1: stimulus number
2: stimulus blocks
3: audio file ('pp' or 'participant' for a recording trial)
4: image file left hand side
5: image file right hand side
*/

var lists = [
  [
    [0, 0, 0, 'aeroplane+nail_british.wav', 'aeroplane.png', 'nail.png'],
    [0, 1, 0, 'participant', 'aubergine.png', 'spoon.png'],
    [0, 2, 1, 'aeroplane+nail_british.wav', 'aeroplane.png', 'nail.png'],
    [0, 3, 1, 'participant', 'aubergine.png', 'spoon.png'],
    [0, 4, 2, 'aeroplane+nail_british.wav', 'aeroplane.png', 'nail.png'],
    [0, 5, 2, 'participant', 'aubergine.png', 'spoon.png'],
  ],
  [
    [1, 0, 1, 'aeroplane+nail_british.wav', 'aeroplane.png', 'nail.png'],
    [1, 1, 1, 'participant', 'aubergine.png', 'spoon.png'],
    [1, 2, 2, 'aeroplane+nail_british.wav', 'aeroplane.png', 'nail.png'],
    [1, 3, 2, 'participant', 'aubergine.png', 'spoon.png'],
  ]
];
