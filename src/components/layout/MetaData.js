/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from "react";
import { Helmet } from "react-helmet";
// eslint-disable-next-line react/prop-types
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - GoShop`}</title>
    </Helmet>
  );
};

export default MetaData;
