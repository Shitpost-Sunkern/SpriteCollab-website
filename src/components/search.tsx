import { Dispatch, SetStateAction } from 'react'

export default function Search(props: {
  currentText: string
  setCurrentText: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="nes-field is-inline search">
      <label
        htmlFor="inline_field"
        style={{ fontSize: "70%", textAlign: "center" }}
      >
        Search
      </label>
      <input
        style={{
          height: "40px",
          borderWidth: "2px",
          fontSize: ".7em"
        }}
        value={props.currentText}
        onChange={e => props.setCurrentText(e.target.value)}
        type="text"
        id="inline_field"
        className="nes-input"
        placeholder="Mew&hellip; Emmuffin&hellip; 151&hellip;"
      />
    </div>
  )
}
