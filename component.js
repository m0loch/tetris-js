import React, { Component } from 'react';
import Subsection from './subsection';

import './style.css';

class Tetris extends Component {
    render() {
        const divs = [];
        for (let i = 0; i < 12 * 20; i++) {
            divs.push(<div key={i} className="tile" />);
        }

        return (
            <div className="tetris">
                <div className="mainColumn">
                    <div className="grid">
                        {divs}
                    </div>
                    <button>Start</button>
                </div>

                <div className="supportColumn">
                    <Subsection title="Score">
                        <p>(value taken from the state)</p>
                    </Subsection>
                    <Subsection title="Next">
                        <p>(value taken from the state)</p>
                    </Subsection>
                    <Subsection className="only-desktop" title="Legend">
                        <table>
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
                        </table>
                    </Subsection>
                </div>

                {/* TODO: add controls for mobile in their own "footer" div with position: absolute */}
            </div>
        )
    }
}

export default Tetris;