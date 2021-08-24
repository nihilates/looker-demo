/**
 * Created by Looker Data Applications Team
 * 2021
 */

import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedDashboard = ({ id }) => {
  console.log("EmbeddedDashboard");
  console.log({ id });
  const [dashboard, setDashboard] = React.useState();

  const setupDashboard = (dashboard) => {
    setDashboard(dashboard);
  };

  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createDashboardWithId(id || 1)
        .withNext()
        .withTheme("atom_fashion_filters") //for now
        .appendTo(el)
        .build()
        .connect()
        .then(setupDashboard)
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

export default EmbeddedDashboard;
