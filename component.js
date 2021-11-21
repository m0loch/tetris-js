import React, { Component } from 'react';
import Subsection from './subsection';

import GameManager from './game/gameManager';
import BlocksFactory from './game/blocksFactory';

import './style.css';

function getTileColor(value) {
    switch (value) {
        case 0:
            return "tile empty";
        case 1:
            return "tile I";
        case 2:
            return "tile L";
        case 3:
            return "tile J";
        case 4:
            return "tile S";
        case 5:
            return "tile Z";
        case 6:
            return "tile T";
        case 7:
            return "tile O";
        default:
            return "tile";
    }
}

class Tetris extends Component {
    constructor(props) {
        super(props);

        this.game = new GameManager(this);
        const board = this.game.getEmptyField(props.width, props.height);

        this.state = {
            level: 1,
            score: 0,
            next: BlocksFactory.getEmpty(),
            board,
            ...props,
        }
    }

    render() {
        const divs = [];
        this.state.board.forEach(row => row.forEach(value => divs.push(<div key={divs.length} className={ getTileColor(value) } />)));

        const preview = [];
        this.state.next.forEach(row => {
            row.forEach(value => preview.push(<div key={preview.length} className={ getTileColor(value) } />));
            preview.push(<div className="break" key={preview.length} />);
        });

        return (
            <div className="tetris">
                <div className="mainColumn">
                    <div className="grid">
                        {divs}
                    </div>
                    <button onClick={ () => this.game.start() }>Start</button>
                </div>

                <div className="supportColumn">
                    <Subsection title="Score">
                        <p className="score">{ this.state.score }</p>
                    </Subsection>
                    <Subsection title="Level">
                        <p className="score">{ this.state.level }</p>
                    </Subsection>
                    <Subsection title="Next">
                        <div className="preview">
                            {preview}
                        </div>
                    </Subsection>
                    <Subsection className="only-desktop" title="Legend">
                        <table>
                            <tbody>
                            <tr>
                                <td><kbd>←</kbd> / <kbd>→</kbd></td><td><p>move piece</p></td>
                            </tr>
                            <tr>
                                <td><kbd>↓</kbd></td><td><p>drop piece</p></td>
                            </tr>
                            <tr>
                                <td><kbd>A</kbd> / <kbd>S</kbd></td><td><p>rotate piece</p></td>
                            </tr>
                            <tr>
                                <td><kbd>Space</kbd></td><td><p>start / pause</p></td>
                            </tr>
                            </tbody>
                        </table>
                    </Subsection>
                </div>

                {/* TODO: add controls for mobile in their own "footer" div with position: absolute */}
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyPressed);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyPressed);
    }

    onKeyPressed = (event) => {
        let handled = false;
        if (event.key !== undefined) {
            // Correct handling of the event
            switch (event.key) {
                case "ArrowLeft":
                    this.game.moveLeft();
                    handled = true;
                    break;
    
                case "ArrowRight":
                    this.game.moveRight();
                    handled = true;
                    break;
    
                case "ArrowDown":
                    this.game.dropPiece();
                    handled = true;
                    break;

                case "A":
                case "a":
                    this.game.rotateLeft();
                    handled = true;
                    break;

                case "S":
                case "s":
                    this.game.rotateRight();
                    handled = true;
                    break;

                case " ":
                    this.game.pauseGame();
                    handled = true;
                    break;

                default:
                    break;
            }
        } else {
            // Deprecated handling, but needed on some browsers
            switch (event.keyCode) {
                case 37: // "ArrowLeft"
                    this.game.moveLeft();
                    handled = true;
                    break;
    
                case 39: // "ArrowRight"
                    this.game.moveRight();
                    handled = true;
                    break;
    
                case 40: // "ArrowDown"
                    this.game.dropPiece();
                    handled = true;
                    break;

                case 65: // A
                    this.game.rotateLeft();
                    handled = true;
                    break;

                case 83: // S
                    this.game.rotateRight();
                    handled = true;
                    break;

                case 32: // Space
                    this.game.pauseGame();
                    handled = true;
                    break;

                default:
                    break;
            }
        }

        if (handled) {
            event.preventDefault();
        }
    }
}

export default Tetris;