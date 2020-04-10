import React from "react";
import { StyleSheet, css } from "aphrodite";
import Cell from "./Cell";

const sty = StyleSheet.create({
  overall: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    background: "#000",
    paddingLeft: '400px',
    paddingRight: '400px'
  },
  holder: {
    justifyContent: "flex-end",
    fontSize: 32,
    display: "flex",
    color: "#fff",
  },
});

interface State {
  value1: string;
  value2: string;
}

class App extends React.Component<{}, State> {
  state = {
    value1: "124",
    value2: "2367.61"
  };
  render() {
    return (
      <div
        className={css(sty.overall)}
        onClick={() =>
          this.setState((s) => {
            if (s.value1 === "103") {
              return { value1: "124", value2:  "2367.61" };
            }
            return { value1: "103", value2:"946.00" };
          })
        }
      >
        <div className={css(sty.holder)}>
          <Cell value={this.state.value1[0]} delayInMS={30} />
          <Cell value={this.state.value1[1]} delayInMS={60} />
          <Cell value={this.state.value1[2]} delayInMS={90} />
          <span style={{ padding: 8}} />
          {"transactions"}
        </div>
        <div className={css(sty.holder)}>
          $
        <Cell value={this.state.value2[0]} delayInMS={30} />
          <Cell value={this.state.value2[1]} delayInMS={60} />
          <Cell value={this.state.value2[2]} delayInMS={90} />
          <Cell value={this.state.value2[3]} delayInMS={120} />
          <Cell value={this.state.value2[4]} delayInMS={150} />
          <Cell value={this.state.value2[5]} delayInMS={180} />
          <Cell value={this.state.value2[6]} delayInMS={210} />


        </div>
      </div>
    );
  }
}
export default App;
