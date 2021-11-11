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

## Work that still needs to be done

1. add extra components
    - start button
        -> temporary functionality
    - score
        -> lacks functionality
    - mobile controls
        -> only TODO
2. actual adding of pieces to the play grid
    - take piece from preview to grid
    - choose next piece
    - balanced random?
3. controls
    - left/right
    - speed up
    - rotation
4. control single piece
5. actual game play
    - game loop
    - game over
    - remove full lines
    - score
6. mobile version
