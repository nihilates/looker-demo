import React, { useState, useEffect } from "react";
import { getSdk } from "../utils/client/looker_sdk";
import { Sparkline } from "@looker/visualizations-visx";
import { Box, Heading } from "@looker/components";
const ComponentSparkline = () => {
  const sdk = getSdk();

  const [data, setData] = useState();
  useEffect(() => {
    getTest();
  }, []);

  const getTest = async () => {
    try {
      const rawApiData = await sdk.ok(
        sdk.run_query({
          query_id: 29336,
          result_format: "json"
        })
      );
      formatApiDataForSparkline(rawApiData);
    } catch (e) {
      console.log({ e });
    }
  };

  const formatApiDataForSparkline = (rawApiData) => {
    console.log("formatApiDataForSparkline ");
    console.log({ rawApiData });
    let formattedApiData = rawApiData.map((item, index) => {
      return {
        [`point${index + 1}`]: [
          [item["users.name"], item["order_facts.order_amount"]]
        ]
      };
    });
    console.log({ formattedApiData });
    setData(formattedApiData);
  };

  return data ? (
    <Box p="large">
      <Heading>Sparkline Visualization Component</Heading>
      <Sparkline
        data={[
          { point1: [["Model Name", 123]] },
          { point2: [["Model Name", 135]] },
          { point3: [["Model Name", 103]] },
          { point4: [["Model Name", 97]] },
          { point5: [["Model Name", 140]] }
        ]}
        // data={data}
        lineWidth={3}
        scheme={["#fa8072"]}
        yAxisRange={[90, 150]}
        treatNullAsZero={true}
      />
    </Box>
  ) : (
    ""
  );
};
export default ComponentSparkline;
