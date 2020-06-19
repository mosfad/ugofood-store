import React from "react";
import { Message } from "semantic-ui-react";

const list = [
  "Improve the taste of our products",
  "Improve the experience of having an on-demand meal.",
];

const FeedbackMessage = () => (
  <Message
    size="big"
    header="Thanks for providing feedback on your samples! Please help us to:"
    icon="comment alternate"
    list={list}
  />
);

export default FeedbackMessage;
