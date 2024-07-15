import { useState } from "react";

export const Player = ({ name, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(name);

  const handleEditClick = () => {
    setIsEditing((current) => !current);
    if (isEditing) {
      onChangeName(symbol, inputName);
    }
  };

  const handleSaveClick = () => {
    handleEditClick();
  };

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" onChange={handleInputChange} />
        ) : (
          <span className="player-name">{inputName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
        {isEditing ? (
          <button onClick={handleSaveClick}> Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </span>
    </li>
  );
};
