import React from "react";
import { useStreamQuery } from "@daml/react";
import {  Poll } from "@daml2ts/openwork-poll-0.0.1/lib/Main";
import { Container } from "@material-ui/core"
import NewPollForm from "./NewPollForm";
import PollCard from "./PollCard";

export default function Default() {
  const polls = useStreamQuery(Poll);

  return (
    <Container maxWidth="sm">
      <NewPollForm />
      <hr />
      { polls.contracts.map((poll) => <PollCard key={poll.contractId} poll={poll} />)}
    </Container>
  );
}
