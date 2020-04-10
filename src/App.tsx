import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import WordFlipper from "./WordFlipper";

const sty = StyleSheet.create({
  overall: {
    display: "flex",
    height: "100vh",
    background: "#000",
    flexDirection: "column",
    fontSize: 32,
    color: "#fff",
    width: '400px',
    margin: 'auto',
  },
});

interface State {
  switcher: boolean;
}

class App extends React.Component<{}, State> {
  state: State = { switcher: false };
  onClick = () => this.setState((s) => ({ switcher: !s.switcher }));
  render() {
    // see https://www.tiktok.com/@pizzaslime/video/6794486830667468037
    const duration = 300;
    return (
      <div className={css(sty.overall)} onClick={this.onClick}>
        <div>
          <WordFlipper
            value={this.state.switcher ? "103" : "124"}
            durationInMS={duration}
          />
          <span>{" transactions"}</span>
        </div>
        <div>
          <span>$</span>
          <WordFlipper
            value={this.state.switcher ? "2,367.61" : "946.00"}
            durationInMS={duration}
          />
        </div>
        <div>
          <span>$</span>
          <WordFlipper
            value={this.state.switcher ? "1" : "1,000,000,946.00"}
            durationInMS={duration}
          />
        </div>
      </div>
    );
  }
}

export default App;
