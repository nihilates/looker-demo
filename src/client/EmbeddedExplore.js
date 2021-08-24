/**
 * Created by Looker Data Applications Team
 * 2021
 */

import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedExplore = () => {
  const [explore, setExplore] = React.useState();

  const setupExplore = (explore) => {
    setExplore(explore);
  };

  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createExploreWithId("atom_fashion::order_items")
        .withParams({
          toggle: "dat,pik,vis"
        })
        .appendTo(el)
        .build()
        .connect()
        .then(setupExplore)
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

export default EmbeddedExplore;
