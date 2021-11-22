import React, { Component } from 'react';

class PausePanel extends Component {
    render() {
        if (!this.props.started) {
            return (<div className="panel">
                <h1>TETRIS</h1>
                <p>Press <kbd>Space</kbd> to start</p>
            </div>
            )
        } else if (this.props.paused) {
            return (<div className="panel">
                <h1>PAUSE</h1>
            </div>)
        } else if (this.props.gameOver) {
            return (<div className="panel">
                <h1>GAME OVER :(</h1>
                <p>Press <kbd>Space</kbd> to try again</p>
            </div>)
        } else {
            return null;
        }
    }
}

export default PausePanel;