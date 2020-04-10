import React from "react";
import Cell from "./Cell";

interface Props {
  durationInMS: number;
  value: string;
}

interface State {
  maxLength: number;
}

class WordFlipper extends React.Component<Props, State> {
  state = {
    maxLength: 0,
  };
  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    if (props.value.length > state.maxLength) {
      return { maxLength: props.value.length };
    }
    return null;
  }
  render() {
    const delayInMS = this.props.durationInMS * 0.15;
    return (
      <div style={{ display: "inline-flex", flexDirection: "row" }}>
        {[...new Array(this.state.maxLength)].map((_, index, vv) => {
          // used so that the front item is removed, not the back
          const padding = this.state.maxLength - this.props.value.length;
          const letter =
            // if there is padding, pad from the front
            padding > index
              ? undefined
              : // if there padding used on the string offset it
              padding > 0
              ? this.props.value[index - padding]
              : // otherwise return the regular string
                this.props.value[index];

          return (
            <Cell
              key={vv.length - 1 - index}
              value={letter}
              delayInMS={delayInMS * index}
              // reverse
              // delayInMS={delayInMS * (vv.length - 1 - index)}
              durationInMS={this.props.durationInMS}
            />
          );
        })}
      </div>
    );
  }
}

export default WordFlipper;
