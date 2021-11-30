# tetris-js
A javascript-based Tetris version meant to be imported as a React submodule

_by Romeo Graifenberg_

## Description
React component embedding a simple Tetris game.

## How to use
Import it as a submodule on git / import the code in the project.
Use it as a component.

You can customize the colors by defining the following variables in the :root element of your CSS:
    --a-color
    --square-color

## Difficulty level
The player will start the game at level 1, gaining a level for every 10 lines completed.
Gaining levels grants the player more points (see the following section) but also increases the speed
at which pieces fall, as per this table:

| Level | Drop speed (msec) |
|------:|------------------:|
|    01 |               800 |
|    02 |               720 |
|    03 |               630 |
|    04 |               550 |
|    05 |               470 |
|    06 |               380 |
|    07 |               300 |
|    08 |               220 |
|    09 |               130 |
|    10 |               100 |
| 11-13 |                80 |
| 14-16 |                70 |
| 17-19 |                50 |
| 20-29 |                30 |
|   30+ |                20 |

### Source
https://gaming.stackexchange.com/questions/13057/tetris-difficulty

## Scoring system
When rows are cleared, the game will award the player a number of points calculated as N * L, with N
being a coefficient related to the number of rows cleared at once and L being the current level
(starting at 1).

### N coefficient
| Lines cleared | Base points |
|--------------:|------------:|
|             1 |          40 |
|             2 |         100 |
|             3 |         300 |
|             4 |        1200 |

### Bonus points for quick dropping
Contrary to the NES version, the game doesn't support any bonus score for dropping pieces

### Source
https://harddrop.com/wiki/Scoring

## Final notes:
The game does not adhere to the Tetris guidelines, maybe it will in the future though!

https://harddrop.com/wiki/Tetris_Guideline

### Missing features from the guidelines:

1. Hold piece mechanic
2. Up key should perform a hard drop
3. Ghost piece mechanic
4. The rotations should respect the SRS system: https://harddrop.com/wiki/SRS
5. Delayed auto-shift: https://harddrop.com/wiki/DAS
6. Next should show the next 3 pieces

## Work that still needs to be done

1. add mobile controls:
    https://www.dropbox.com/s/g55gwls0h2muqzn/tetris%20guideline%20docs%202009.zip?file_subpath=%2F2009+Tetris+Design+Guideline.pdf (page 12/90)
