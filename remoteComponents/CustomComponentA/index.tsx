import React from "react";
import { Wrapper } from "./style";

const ComponentA: React.FC = (props) => {
  console.error("props", props);

  return <Wrapper>Component A</Wrapper>;
};

export default ComponentA;
