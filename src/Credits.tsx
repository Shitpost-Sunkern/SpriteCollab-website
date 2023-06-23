import { TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Navbar from "./components/navbar"
import { useCreditsQuery } from "./generated/graphql"

export default function Credits() {
  const credits = useCreditsQuery()?.data?.credit;
  if (!credits) return null;
  const tableRow = credits.map(x => (
    <TableRow>
      <TableCell><Typography>{x.id}</Typography></TableCell>
      <TableCell><Typography>{x.name}</Typography></TableCell>
      <TableCell><Typography>{x.contact}</Typography></TableCell>
    </TableRow>
  ))
  return (
    <div className="App about">
      <Navbar />
      <div className="main-box nes-container" style={{ overflow: "scroll" }}>
        <h1 className="nes-text is-primary">Credits</h1>
        <TableContainer style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <TableBody style={{ flex: "1 1 auto", overflowY: "auto" }}>
            <TableCell><Typography>ID</Typography></TableCell>
            <TableCell><Typography>Name</Typography></TableCell>
            <TableCell><Typography>Contact</Typography></TableCell>
            {tableRow}
          </TableBody>
        </TableContainer>
      </div>
    </div>
  )
}
