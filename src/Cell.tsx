import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

const showTransition = {
  "0%": {
    opacity: 0,
    transform: "scale(0.4)",
  },
  "55%": {
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
  "45%": {
    opacity: 0,
    transform: "scale(0.4)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.4)",
  },
};

const sty = StyleSheet.create({
  overall: {
    overflow: "hidden",
    transitionTimingFunction: "ease",
    transitionProperty: "all",
    position: "relative",
    display: "block",
  },
  hiddenFixedWidthCell: {
    opacity: 0,
    cursorEvents: "none",
    userSelect: 'none',
  },
  cell: {
    position: "absolute",
    top: 0,
    left: 0,
    animationIterationCount: 1,
    animationFillMode: "both",
    fontFeatureSettings: "tnum",
  },
  showCell: {
    animationName: showTransition,
    userSelect: 'auto',
  },
  hideCell: {
    animationName: hideTransition,
    
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
  durationInMS: number;
}

class Cell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeCellOne: true,
      cellOneValue: this.props.value,
      cellTwoValue: undefined,
      cellWidth: 0,
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
      console.log(cellWidth)
      if (cellWidth > this.state.cellWidth) {
        this.setState({ cellWidth });
      }
    } else {
      console.log('heyy')
    }
  };

  componentDidMount() {
    requestAnimationFrame(this.setWidth)
  }
  componentDidUpdate() {
    this.setWidth();
  }

  render() {
    const activeCellHidden = this.state.activeCellOne
      ? this.state.cellOneValue == null
      : this.state.cellTwoValue == null;

    return (
      <span>
        <div
          style={{
            width: activeCellHidden ? 0 : this.state.cellWidth,
            transitionDelay: `${this.props.delayInMS}ms`,
            transitionDuration: `${this.props.durationInMS}ms`,
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
              this.state.activeCellOne === true ? sty.showCell : sty.hideCell
            )}
            style={{
              animationDelay: `${this.props.delayInMS}ms`,
              animationDuration: `${this.props.durationInMS}ms`,
            }}
          >
            {this.state.cellOneValue}
          </span>
          <span
            className={css(
              sty.cell,
              this.state.activeCellOne === false ? sty.showCell : sty.hideCell
            )}
            style={{
              animationDelay: `${this.props.delayInMS}ms`,
              animationDuration: `${this.props.durationInMS}ms`,
            }}
          >
            {this.state.cellTwoValue}
          </span>
        </div>
      </span>
    );
  }
}
export default Cell;
