import React from "react";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

export default props => {
  const { data } = useSWR(`/api/og/${encodeURIComponent(props.url)}`, route =>
    fetch(route).then(r => r.ok && r.json())
  );

  console.log(data);

  return null;
};
