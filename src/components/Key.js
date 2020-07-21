import React from "react";

function Key({ keyIndex, diplsayKey = [], onClickHandler }) {
  return (
    <div
      onClick={() => onClickHandler(keyIndex)}
      className={
        diplsayKey[0] === "*" || diplsayKey[0] === "#"
          ? "nonNumberInPad"
          : "numberInPad"
      }
    >
      <div className="mainKeyInMad">{diplsayKey[0]}</div>
      <div
        className={
          diplsayKey[0] === "*" || diplsayKey[0] === "#"
            ? "grayedOutSubKey"
            : "subKeysInPab"
        }
      >
        {diplsayKey.slice(1).join("")}
      </div>
    </div>
  );
}

export default Key;
