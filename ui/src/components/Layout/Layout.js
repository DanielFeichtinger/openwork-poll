import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import Report from "../../pages/report/Report";
import DamlLedger from "@daml/react";
import { useUserState } from "../../context/UserContext";
import Default from "../../pages/default/Default";

function Layout() {
  const classes = useStyles();
  const user = useUserState();
  const layoutState = useLayoutState();
  const wsBaseUrl = "ws://localhost:7575/";
  
  return (
    <DamlLedger party={user.party} token={user.token} wsBaseUrl={wsBaseUrl}>
      <div className={classes.root}>
          <>
            <Header />
            <Sidebar />
            <div
              className={classnames(classes.content, {
                [classes.contentShift]: layoutState.isSidebarOpened,
              })}
            >
              <div className={classes.fakeToolbar} />
              <Switch>
                <Route path="/app/default" component={Default} />
                <Route path="/app/report" component={Report} />
              </Switch>
            </div>
          </>
      </div>
    </DamlLedger>
  );
}

export default withRouter(Layout);