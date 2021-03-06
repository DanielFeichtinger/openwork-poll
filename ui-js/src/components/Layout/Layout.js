import React from "react";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header/Header";
import { useLayoutState } from "../../context/LayoutContext";
import Default from "../../pages/default/Default";
import DamlLedger from "@daml/react";
import { useUserState } from "../../context/UserContext";
import { wsBaseUrl, httpBaseUrl } from "../../config";

export default function Layout() {
  const classes = useStyles();
  const user = useUserState();
  const layoutState = useLayoutState();

  return (
    <DamlLedger party={user.party} token={user.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
      <div className={classes.root}>
          <>
            <Header />
            <div
              className={classnames(classes.content, {
                [classes.contentShift]: layoutState.isSidebarOpened,
              })}
            >
              <div className={classes.fakeToolbar} />
              <Default />
            </div>
          </>
      </div>
    </DamlLedger>
  );
}
