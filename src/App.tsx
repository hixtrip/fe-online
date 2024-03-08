import React, { useState, useCallback } from "react";
import "./App.css";

import OrgTree from "@components/OrgTree";
import UserTable from "@components/UserTable";
import GlobalContextProvider, {
  globalContext,
} from "@components/GlobalContextProvider/index";

function App() {
  const [loading, setLoading] = useState(false);
  const changeLoading = useCallback((val: boolean) => {
    setLoading(val);
  }, []);

  return (
    <GlobalContextProvider
      context={globalContext}
      value={{ loading, changeLoading }}
    >
      <div className="layout">
        <div className="aside">
          <OrgTree />
        </div>
        <div className="main">
          <UserTable />
        </div>
      </div>
    </GlobalContextProvider>
  );
}

export default App;
