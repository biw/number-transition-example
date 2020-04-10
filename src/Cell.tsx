import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

const showTransition = {
  "0%": {
    opacity: 0,
    transform: "scale(0.4)",
  },
  "30%": {
    opacity: 0,
    transform: "scale(0.4)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
};

const hideTransition = {
  "0%": {
    opacity: 1,
    transform: "scale(1)",
  },
  "30%": {
    opacity: 0,
    transform: "scale(1)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.4)",
  },
};

const sty = StyleSheet.create({
  overall: {
    overflow: "hidden",
    transition: "200ms ease all",
    position: "relative",
  },
  hiddenFixedWidthCell: {
    opacity: 0,
    cursorEvents: "none",
  },
  cell: {
    position: "absolute",
    animationName: showTransition,
    animationDuration: "200ms",
    animationIterationCount: 1,
    animationFillMode: "both",
    top: 0,
    left: 0,
  },
  hideCell: {
    animationName: hideTransition,
    animationDuration: "200ms",
    animationIterationCount: 1,
    animationFillMode: "both",
  },
});

interface State {
  activeCellOne: boolean | null;
  cellOneValue?: string;
  cellTwoValue?: string;
  cellWidth: number;
}

interface Props {
  value?: string;
  delayInMS: number;
}

class Cell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeCellOne: true,
      cellOneValue: this.props.value,
      cellTwoValue: undefined,
      cellWidth: 16,
    };
  }

  fixedWidthCellRef = React.createRef<HTMLDivElement>();

  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    if (state.activeCellOne) {
      return { cellTwoValue: props.value, activeCellOne: false };
    }
    if (state.activeCellOne === false) {
      return { cellOneValue: props.value, activeCellOne: true };
    }
    return null;
  }

  setWidth = () => {
    if (this.fixedWidthCellRef.current) {
      const cellWidth = this.fixedWidthCellRef.current.scrollWidth;
      if (cellWidth > this.state.cellWidth) {
        this.setState({ cellWidth });
      }
    }
  };

  componentDidMount() {
    this.setWidth();
  }
  componentDidUpdate() {
    this.setWidth();
  }

  render() {
    const activeCellHidden = this.state.activeCellOne
      ? this.state.cellOneValue == null
      : this.state.cellTwoValue == null;

    return (
      <div
        style={{
          width: activeCellHidden ? 0 : this.state.cellWidth,
          transitionDelay: `${this.props.delayInMS}ms`,
        }}
        className={css(sty.overall)}
        onClick={() =>
          this.setState((s) => ({
            activeCellOne: s.activeCellOne !== null ? !s.activeCellOne : null,
          }))
        }
      >
        <span
          ref={this.fixedWidthCellRef}
          className={css(sty.hiddenFixedWidthCell)}
        >
          8
        </span>
        <span
          className={css(
            sty.cell,
            this.state.activeCellOne === true ? null : sty.hideCell
          )}
          style={{ animationDelay: `${this.props.delayInMS}ms` }}
        >
          {this.state.cellOneValue}
        </span>
        <span
          className={css(
            sty.cell,
            this.state.activeCellOne === false ? null : sty.hideCell
          )}
          style={{ animationDelay: `${this.props.delayInMS}ms` }}
        >
          {this.state.cellTwoValue}
        </span>
      </div>
    );
  }
}
export default Cell;
