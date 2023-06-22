import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from 'react';

export default function LightButton(props: { isLight: boolean, setLight: (arg0: boolean) => void}) {
  const [isLight, setLight] = useState<boolean>(true);
  return (
    <button
      style={{ fontSize: ".8em" }}
      className="my-btn nes-btn is-warning"
      onClick={() => {
        if (isLight) {
          document.querySelectorAll('.is-light').forEach(x => x.classList.replace('is-light', 'is-dark'));
          document.querySelectorAll('.light').forEach(x => x.classList.replace('light', 'dark'));
        } else {
          document.querySelectorAll('.is-dark').forEach(x => x.classList.replace('is-dark', 'is-light'));
          document.querySelectorAll('.dark').forEach(x => x.classList.replace('dark', 'light'));
        }
        setLight(!isLight);
        localStorage.setItem("theme", isLight ? "light" : "dark");
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <FontAwesomeIcon icon={isLight ? faMoon : faSun} />
      </div>
    </button>
  )
}
