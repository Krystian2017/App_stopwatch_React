class Stopwatch extends React.Component{
  constructor(display) {
    super(display);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      savedTimes: []
    }
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format() {
    return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({running: true});
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    const times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }
    this.setState({times});
  }

  stop() {
    this.state.running = false;
    clearInterval(this.watch);
  }

  recordTime() {
    const currentTimeData = {
      time: this.format(this.state.times),
      id: this.state.savedTimes.length + 1
    };
    const timeData = [...this.state.savedTimes, currentTimeData]
    this.setState({savedTimes: timeData})
  }

  clearTime() {
    this.setState({savedTimes: []}) 
  }

  render() {
    return (
      <div>
        <div className = "controls">
          <a href = "#" className = "button" onClick = {() => this.start()}>Start</a>
          <a href = "#" className = "button" onClick = {() => this.stop()}>Stop</a>
          <a href = "#" className = "button" onClick = {() => this.reset()}>Reset</a>
          <a href = "#" className = "button" onClick = {() => this.recordTime()}>Record</a>
          <a href = "#" className = "button" onClick = {() => this.clearTime()}>Clear</a>
        </div>  
        <div className="stopwatch">{this.format()}</div>
        <SavedTimesList savedTimes={this.state.savedTimes} />
      </div>
    );
  }
}

class SavedTimesList extends React.Component {
  render() {
    const singleTimes = this.props.savedTimes.map((singleSavedTime) =>
      <li key={singleSavedTime.id}>
        {singleSavedTime.time}
      </li>
    );
    return (
      <ul>
        {singleTimes}
      </ul>
    )
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app);