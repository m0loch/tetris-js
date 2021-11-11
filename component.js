import React, { Component } from 'react';
import Subsection from './subsection';

import GameManager from './game/gameManager';
import BlocksFactory from './game/blocksFactory';

import './style.css';

function getTileColor(value) {
    switch (value) {
        case 0:
            return "tile empty";
        default:
            return "tile red";
    }
}

class Tetris extends Component {
    constructor(props) {
        super(props);

        this.game = new GameManager();

        const field = new Array(props.width * props.height).fill(0);

        this.state = {
            score: 0,
            next: BlocksFactory.getEmpty(),
            field,
            ...props,
        }
    }

    render() {
        console.log(this.state);
        const divs = [];
        this.state.field.forEach(value => divs.push(<div key={divs.length} className={ getTileColor(value) } />));

        const preview = [];
        console.log(this.state.next);
        this.state.next.shape.forEach(row => {
            row.forEach(value => preview.push(<div key={preview.length} className={ getTileColor(value) } />));
            preview.push(<br key={preview.length} />);
        });

        return (
            <div className="tetris">
                <div className="mainColumn">
                    <div className="grid">
                        {divs}
                    </div>
                    <button onClick={ () => {
                            let state = {...this.state};
                            state.next = this.game.start();
                            this.setState(state);
                        } }>Start</button>
                </div>

                <div className="supportColumn">
                    <Subsection title="Score">
                        <p className="score">{ this.props.score }</p>
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
}

export default Tetris;