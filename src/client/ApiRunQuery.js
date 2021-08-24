import React, { useState, useEffect } from "react";
import { getSdk } from "../utils/client/looker_sdk";

const ApiRunQuery = () => {
  const sdk = getSdk();

  const [data, setData] = useState();
  useEffect(() => {
    getTest();
  }, []);
  const getTest = async () => {
    try {
      const results = await sdk.ok(
        sdk.run_query({
          query_id: 970,
          result_format: "json"
        })
      );
      setData(results);
    } catch (e) {
      console.log({ e });
    }
  };
  return (
    <code style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</code>
  );
};
export default ApiRunQuery;
