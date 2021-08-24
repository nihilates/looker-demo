/**
 * Created by Looker Data Applications Team
 * 2021
 */

import React, { useCallback, useEffect } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedQuery = () => {
  const [query, setQuery] = React.useState();

  const setupQuery = (query) => {
    setQuery(query);
  };

  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      //qid cannot be copied across instances
      LookerEmbedSDK.createExploreWithUrl(
        `${hostUrl}/embed/query/atom_fashion/order_items?qid=1aI56YXY3jo5z4heutKPao&sdk=2`
      )
        .withNext()
        .appendTo(el)
        .build()
        .connect()
        .then(setupQuery)
        .catch((error) => {
          console.error("Connection error", error);
        });
    }
  }, []);

  return (
    <>
      <EmbedContainer ref={embedCtrRef} />
    </>
  );
};

export default EmbeddedQuery;
