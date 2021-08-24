/**
 * Created by Looker Data Applications Team
 * 2021
 */

import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedLook = () => {
  const [look, setLook] = React.useState();

  const setupLook = (look) => {
    setLook(look);
  };

  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createLookWithId("7")
        .appendTo(el)
        .build()
        .connect()
        .then(setupLook)
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

export default EmbeddedLook;
