import React, { Component } from 'react';
import jQuery from "jquery";
import lightTabsFunction from "./scripts/lightTabs";
import axios from "axios";
import HashrateTable from "./components/hashrateTable"
import DataWindow from "./components/dataWindow"

class App extends Component {
  constructor() {
    super();
    this.state = {
      workers: "",
    };
    this.getHashrates = this.getHashrates.bind(this);
    this.changeHashrate = this.changeHashrate.bind(this);
  }
  getHashrates(address, time) {
    this.setState({
      workers: "",
    });
    axios.get("http://localhost:3010/api/",
      {
        params: {
          address,
          time
        }
      })
      .then((workers) => {
        console.log(workers.data);
        this.setState({
          workers: workers.data
        })
      })
      .catch((err) => {
        console.log('errgetHashrates', err);
      });
  }
  changeHashrate(val, worker) {
    if (!val || !worker) {
      console.log('errorchangeHashrate');
      return;
    }
    this.setState({
      workers:{
        [worker] : {
          "badHashrate" : val
        }
      }
    }, ()=> {
      console.log(this.state);
    })
  }

  render() {
    return (
      <div>
        <div>
          <DataWindow
          startMonitoring={this.getHashrates}
          />
        </div>
        <div>
          <HashrateTable
          workers={this.state.workers}
          changeHashrate = {this.changeHashrate}
          />
        </div>
      </div>
    )
  }

}

export default App;
