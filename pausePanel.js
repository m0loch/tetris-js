import React, { Component } from 'react';

class PausePanel extends Component {

    render() {
        if (this.props.started && !this.props.paused && !this.props.gameOver)
            return null;

        return (<div id="panel" className="panel" onClick={this.processTouchEnd}>
            {!this.props.started &&
                <div>
                    <h1>TETRIS</h1>
                    <p className="only-desktop">Press <kbd>Space</kbd> to start</p>
                    <p className="only-mobile">Tap to start</p>
                </div>}
            {this.props.paused && <h1>PAUSE</h1>}

            {this.props.gameOver && 
                <div className="panel">
                    <h1>GAME OVER :(</h1>
                    <p className="only-desktop">Press <kbd>Space</kbd> to try again</p>
                    <p className="only-mobile">Tap to try again</p>
                </div>}
        </div>);
    }

    componentDidMount() {
        let element = document.getElementById("panel");
        element.addEventListener('touchstart', this.processTouchStart, false);
        element.addEventListener('touchend', this.processTouchEnd, false);
    }

    componentWillUnmount() {
        let element = document.getElementById("panel");
        element.removeEventListener('touchstart', this.processTouchStart, false);
        element.removeEventListener('touchend', this.processTouchEnd, false);
    }

    processTouchStart = (ev) => {
    }

    processTouchEnd = (ev) => {
        this.props.onTapCallback();
    }
}


export default PausePanel;