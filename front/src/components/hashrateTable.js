import React, { Component } from 'react';
import Worker from './worker';
// import './info.css';

class HashrateTable extends Component {

    render() {
        const changeHashrate = (e, worker) => {
            if (!e) {
                return;
            }
            this.props.changeHashrate(e.textInput.value, worker)
        }
        const { workers } = this.props;
        const workersArr = [];
        const rows = [];
        let count = 0;
        for (let w in workers) {
            workersArr.push({
                "name": w,
                "hashrate": workers[w].hashrate,
                "reportedHashrate": workers[w].reportedHashRate,
                "workerLastSubmitTime": workers[w].workerLastSubmitTime,
            })
        }
        workersArr.forEach((w) => {
            rows.push(<Worker
                key={count++}
                worker={w.name}
                hashrate={w.hashrate}
                reportedHashrate={w.reportedHashrate}
                workerLastSubmitTime={w.workerLastSubmitTime}
                changeHashrate={changeHashrate}
            />)
        })
        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default HashrateTable;
