import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core"
import { useParty, useFetchByKey, useExerciseByKey } from "@daml/react";
import { User, PollApp } from "@daml2ts/openwork-poll-0.0.1/lib/Main";
import { v4 as uuid } from 'uuid';

export default function NewPollForm() {
  const user = useParty();
  const operator = 'Admin';
  const app = useFetchByKey(PollApp, () => operator, [operator]).contract;

  const createPoll = useExerciseByKey(User.CreatePoll);

  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([""]);

  // Bah, stupid JS not having an immutable array update...
  const updatedOptions = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    return newOptions;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = uuid();
    createPoll([operator, user], { creator: user, id, description, options });
  };

  const addOption = (event) => {
    event.preventDefault();
    setOptions((prevOptions) => [...prevOptions, ""]);
  };

  const optionsInputs = options
    .map((option, index) =>
      <Grid item key={index}>
        <TextField
          variant="outlined"
          label="Options"
          value={option}
          onChange={(e) => setOptions(updatedOptions(e.target.value, index))}
        />
      </Grid>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <TextField
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        {optionsInputs}
        <Grid item>
          <Button variant="outlined" onClick={addOption}>Add option</Button>
        </Grid>
        <Grid item>
          <input type="submit" id="create-poll" style={{display: "none"}} />
          <label htmlFor="create-poll">
            <Button
              variant="contained"
              color="primary"
              component="span"
              disabled={app === undefined}
            >
              Create poll
            </Button>
          </label>
        </Grid>
      </Grid>
    </form>
  );
}
