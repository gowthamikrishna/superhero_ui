import React, { Component } from "react";
import Key from "./Key";

export class KeyBoard extends Component {
  constructor(props) {
    super(props);
    this.keys = [
      ["1", "@", ".", "?"],
      ["2", "A", "B", "C"],
      ["3", "D", "E", "F"],
      ["4", "G", "H", "I"],
      ["5", "J", "K", "L"],
      ["6", "M", "N", "O"],
      ["7", "P", "Q", "R", "S"],
      ["8", "T", "U", "V"],
      ["9", "W", "X", "Y", "Z"],
      ["*", "s", "e", "n", "d"],
      ["0", "Z", "e", "r", "o"],
      ["#", "s", "p", "a", "c", "e"],
    ];
    this.MESSAGE_INVALID =
      "Invalid Request. Expected format is:0 <space> <code>. Please try again!.";
    this.state = {
      keyPresses: [],
      message: "Send request by pressing key(Sample:0 <space> <code>)",
    };
  }
  makeRequestTocallSuperHero(keysData = []) {
    let keyPressed = keysData.map((index) => index + 1).join("");
    let fetchingDataDisplay = `Request in expected format'0 '${keyPressed}. calling back end with  `;
    this.setState({
      ...this.state,
      message: fetchingDataDisplay,
    });
    const apiURL = `http://localhost:5002/superhero/${keyPressed}`;
    console.log(`URL used for fetching data${apiURL}`);
    fetch(apiURL)
      .then((response) => response.text())
      .then((data) =>
        this.setState({
          keyPresses: [],
          message: data,
        })
      )
      .catch((error) =>
        this.setState({
          ...this.state,
          message: `error  while trying to get Super hero from back end:${error}`,
        })
      );
  }
  handleKeyPress = (keyIndex) => {
    if (keyIndex === 9) {
      //if send is clicked
      //minimum letters required to call backend is 6
      if (this.state.keyPresses[0] === 10 && this.state.keyPresses[1] === 11) {
        if (this.state.keyPresses.length < 5) {
          this.setState({
            ...this.state,
            message: "Minimum 4 letter should be followed by '0 '",
          });
          return;
        }
        this.makeRequestTocallSuperHero(this.state.keyPresses.slice(2));
      } else {
        this.setState({
          keyPresses: [],
          message: this.MESSAGE_INVALID,
        });
      }
    } else {
      let keyPressedMsg = "";
      let keysCaptured = this.state.keyPresses.slice();
      keysCaptured.push(keyIndex);
      let startIndexToFormMessage = 0;
      if (this.state.keyPresses[0] === 10 && this.state.keyPresses[1] === 11) {
        keyPressedMsg = "0 ";
        startIndexToFormMessage = 2;
      }
      //show in message ,previously collected keys
      keyPressedMsg =
        keyPressedMsg +
        this.state.keyPresses
          .slice(startIndexToFormMessage)
          .map((i) => `${this.keys[i][0]}`)
          .join("");
      //show currently pressed key
      keyPressedMsg =
        keyPressedMsg + `${this.keys[keyIndex][0]}`;
      this.setState({ keyPresses: keysCaptured, message: keyPressedMsg });
    }
  };
  getRowRenderer(columns = [], rowKey, startIndex) {
    return (
      <tr key={rowKey}>
        {columns.map((diplsayKey, i) => {
          return (
            <td key={i}>
              <Key
                keyIndex={i + startIndex}
                diplsayKey={diplsayKey}
                onClickHandler={this.handleKeyPress}
              ></Key>
            </td>
          );
        })}
      </tr>
    );
  }
  allRows = () => {
    let rows = [];
    rows = rows.concat(this.getRowRenderer(this.keys.slice(0, 3), "0-3", 0));
    rows = rows.concat(this.getRowRenderer(this.keys.slice(3, 6), "3-6", 3));
    rows = rows.concat(this.getRowRenderer(this.keys.slice(6, 9), "6-9", 6));
    rows = rows.concat(this.getRowRenderer(this.keys.slice(9, 12), "9-12", 9));
    return rows;
  };
  render() {
    return (
      <div className="keyPad">
        <table className="keyPadTable">
          <tbody>{this.allRows()}</tbody>
        </table>
        <div className="displayMessage">{this.state.message}</div>
      </div>
    );
  }
}

export default KeyBoard;
