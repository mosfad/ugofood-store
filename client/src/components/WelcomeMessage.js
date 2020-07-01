import React from "react";
import { Message } from "semantic-ui-react";

const list = [
  "You can securely order free samples",
  "We only ask that you leave a review",
];

const WelcomeMessage = () => (
  <Message
    size="big"
    header="Welcome to our online food store"
    icon="shopping bag"
    list={list}
  />
);

export default WelcomeMessage;
