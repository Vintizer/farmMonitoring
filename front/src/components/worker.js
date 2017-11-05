import React, { Component } from 'react';
// import './info.css';

class Worker extends Component {
    render() {
        const { worker, hashrate, reportedHashrate, workerLastSubmitTime, changeHashrate } = this.props;
        console.log('changeHashrate',changeHashrate);
        console.log('bind',changeHashrate.bind(this));
        return (
            <div>
                {worker}  - {reportedHashrate} - {hashrate} -
                {workerLastSubmitTime ?
                    (new Date() - new Date(workerLastSubmitTime * 1000)) / 1000
                    : ""} сек <br />
                <input type="text" id="badHashrate" ref={(input) => { this.textInput = input; }}></input>
                <button onClick={changeHashrate.bind(this, this, worker)}>Ok</button>
            </div>
        );
    }
}

export default Worker;
