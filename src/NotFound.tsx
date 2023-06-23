import Navbar from "./components/navbar"

export default function NotFound() {
  return (
    <div className="App">
      <Navbar />
      <div
        className="nes-container"
        style={{
          height: "90vh",
          overflowY: "scroll",
          backgroundColor: "rgba(255,255,255,0.8)",
          display: "flex",
          flexFlow: "column",
          alignItems: "center"
        }}
      >
        <h1 className="nes-text is-primary">404 not found</h1>
        <p>
          There's no content here. Please note that Pokémon indexes are
          zero-padded. If you are looking for Mew, the url will be{" "}
          <a href={"/#/0151"}>{window.location.hostname + "/#/0151"} </a>
          and not {window.location.hostname + "/#/151"}.
        </p>
      </div>
    </div>
  )
}
