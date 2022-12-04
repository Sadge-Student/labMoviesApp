import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function Pagination(props) {
    return (
        <div style={{padding: 20}}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Button disabled={props.currentPage === 1} variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={() => props.setCurrentPage(prevValue => prevValue - 1 )} style={{margin: '0 10px'}}>Previous Page</Button>
              
              <TextField 
                id="standard-basic" 
                label="Page Search" 
                inputProps={{min: 0, style: { textAlign: 'center' }}}
                variant="standard"
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter' && ev.target.value <= 500 && ev.target.value > 0) {
                    if (!isNaN(ev.target.value)) {
                      props.setCurrentPage(ev.target.value);
                      ev.preventDefault();
                    }
                  }
                }}
              />
              
              <Button disabled={props.currentPage === 500} variant="outlined" endIcon={<NavigateNextIcon />} onClick={() => props.setCurrentPage(prevValue => prevValue + 1 )} style={{margin: '0 10px'}}>Next Page</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
}