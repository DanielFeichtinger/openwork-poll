import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Card, CardContent, CardActions, Typography, Grid, Table, TableBody, TableRow, TableCell } from "@material-ui/core"
import { useParty, useExerciseByKey, useStreamQuery } from "@daml/react";
import { User, Response } from "@daml2ts/openwork-poll-0.0.1/lib/Main";
import useStyles from "./styles"

export default function PollCard({ poll }) {
  const classes = useStyles();

  const [showResponses, setShowResponses] = useState(false);

  const user = useParty();
  const operator = 'Admin';

  const { contracts: responses } = useStreamQuery(Response, () => ({pollId: poll.payload.id}));
  const vote = useExerciseByKey(User.Vote);

  const optionButtons = (contractId, {id, options}) =>
    options.map((option, index) =>
      <Grid item key={contractId + index}>
        <Button
          variant="outlined"
          onClick={() => (vote([operator, user], { pollId: id, responseIndex: index }))}
        >
          {option}
        </Button>
      </Grid>
    );

  const responseTable = () => {
    const allResponses = responses.map((r) => r['payload']['responseIndex']);
    const counts = poll.payload.options.map((option, index) => ({
        option: option,
        count: allResponses.filter((res) => res === `${index}`).length
      })
    );
    return (
      allResponses === [] ? <p>No responses so far</p> :
      <Table>
        <TableBody>
          { counts.map(({option, count}) =>
            <TableRow key={option}>
              <TableCell component="th">
                {option}
              </TableCell>
              <TableCell>
                {count}
              </TableCell>
            </TableRow>
            )
          }
        </TableBody>
      </Table>
    );
  };

  const formattedDate = (date) => (new Date(date).toLocaleDateString());

  const toggleResponseVisibilityButton = (
    <Button onClick={() => setShowResponses(!showResponses)}>
      { showResponses ? 'Hide responses' : 'Show responses' }
    </Button>
  );

  return (
    <Card className={classes.card}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <CardContent>
            <Typography variant="h5">
              {poll.payload.creator} &middot; {formattedDate(poll.payload.createdAt)}
            </Typography>
            <p>{poll.payload.description}</p>
          </CardContent>
          <CardActions>
            <Grid container direction="column" spacing={1}>
              {optionButtons(poll.contractId, poll.payload)}
            </Grid>
          </CardActions>
        </Grid>
        <Grid item>
          { toggleResponseVisibilityButton }
          { showResponses ? responseTable() : "" }
        </Grid>
      </Grid>
    </Card>
  );
}

PollCard.propTypes = {
  poll: PropTypes.shape({
    contractId: PropTypes.string.isRequired,
    payload: PropTypes.shape({
      id: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      options: PropTypes.array.isRequired
    }).isRequired
  }).isRequired
}
