import { useState, useCallback, useEffect } from "react";
import "./PasswordGen.css";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [numberChecked, setNumberChecked] = useState(true);
  const [specialCharactersChecked, setSpecialCharactersChecked] =
    useState(true);
  const [sliderValue, setSliderValue] = useState(6);
  const [copyButtonName, setCopyButtonName] = useState("Copy");

  const generatePassword = useCallback(() => {
    let generatedPassword = "";
    let PASSWORDSTRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const NUMS = "1234567890";
    const SPECIAL_CHARACTERS = "!@#$%^&*()_+-=[{]}|:;?";

    if (numberChecked) PASSWORDSTRING += NUMS;
    if (specialCharactersChecked) PASSWORDSTRING += SPECIAL_CHARACTERS;

    for (let i = 0; i < sliderValue; i++) {
      const charIndex = Math.floor(Math.random() * PASSWORDSTRING.length + 1);
      generatedPassword += PASSWORDSTRING.charAt(charIndex);
    }

    setPassword(generatedPassword);
  }, [sliderValue, specialCharactersChecked, numberChecked]);

  function copyPasswordToClipboard() {
    window.navigator.clipboard.writeText(password);
    setCopyButtonName("Copied !");
    setTimeout(() => {
      setCopyButtonName("Copy");
    }, 1000);
  }

  useEffect(generatePassword, [
    numberChecked,
    specialCharactersChecked,
    sliderValue,
  ]);
  return (
    <>
      <div className="main-container">
        <div className="display-container">
          {/* <h3 className="password-text">{password}</h3> */}
          <input type="text" placeholder="password" value={password} readOnly />
          <button
            className="copy-button"
            onClick={() => copyPasswordToClipboard()}
          >
            {copyButtonName}
          </button>
        </div>
        <div className="checkbox-container">
          <div>
            <label htmlFor="length-slider">{sliderValue}</label>
            <input
              type="range"
              defaultValue={sliderValue}
              name="rangeSlider"
              min="5"
              max="15"
              id="length-slider"
              onChange={(event) => {
                setSliderValue(event?.target?.value);
              }}
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={specialCharactersChecked}
              name="specialCharactersCheckbox"
              id="specialCharacters"
              onChange={() => setSpecialCharactersChecked((prev) => !prev)}
            />
            <label htmlFor="specialCharacters">Special Characters</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={numberChecked}
              name="numbersCheckbox"
              id="numberChecked"
              onChange={() => setNumberChecked((prev) => !prev)}
            />
            <label htmlFor="numberChecked">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
