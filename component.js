import React, { Component } from 'react';

import './style.css';

class Tetris extends Component {
    render() {
        const divs = [];
        for (let i = 0; i < 12 * 20; i++) {
            divs.push(<div id={i} className="tile" />);
        }

        return (
            <div className="tetris">
                <div className="grid">
                    {divs}
                </div>
                {/* TODO: add controls for mobile */}
            </div>
        )
    }
}

export default Tetris;