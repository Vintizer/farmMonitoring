import React, { Component } from 'react';
// import './info.css';

class DataWindow extends Component {
    render() {
        const startMonitoring = () => {
            const wallet = document.getElementById("idWallet").value;
            const time = document.getElementById("idTime").value;
            if (!wallet || !time) {
                return
            };
            this.props.startMonitoring(wallet, time);
        }
        return (
            <div>
                <span>Id</span>
                <input type="text" id="idWallet" placeholder="ваш ID" value="9cee301c8fa73924c20ce694557f0471e1234549"
                />
                введите ваш ID
                <br />
                <span>sec</span>
                <input type="text" id="idTime" placeholder="секунд" value="10000" />
                Введите время обновления данных в секундах
                <br />
                <button type="button" onClick={startMonitoring}>Start Monitoring</button>
            </div>
        );
    }
}

export default DataWindow;
