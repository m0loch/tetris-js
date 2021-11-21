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
The player will start the game at level 1

## Scoring system
When rows are cleared, the game will award the player a number of points calculated as N * L, with N
being a coefficient related to the number of rows cleared at once and L being the current level
(starting at 1).

### N coefficient
| Lines cleared | Base points |
|---------------|------------:|
| 1 |   40 |
| 2 |  100 |
| 3 |  300 |
| 4 | 1200 |

### Bonus points for quick dropping
Contrary to the NES version, the game doesn't support any bonus score for dropping pieces

### Source
https://harddrop.com/wiki/Scoring

## Final notes:
The game does not adhere to the Tetris guidelines, maybe it will in the future though!

https://harddrop.com/wiki/Tetris_Guideline

## Work that still needs to be done

1. add extra components
    - start button
        -> temporary functionality
    - mobile controls
        -> only TODO
    - level section
2. actual game play
    - game loop
    - start as pause + remove start button
    - difficulty level
3. next piece chosen by a balanced random?
4. fix *style.css* in order for it to get accomodate for changes of the height/width parameters
5. mobile version
