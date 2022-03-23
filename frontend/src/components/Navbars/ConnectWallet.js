import { React, useContext } from "react";

import { logoutWeb3Modal, getWalletProvider } from "../../utils/connectWallet";
import { Button } from "reactstrap";
import { store } from "../../store/store";
import { SET_WEB3_PROVIDER } from "../../store/types";

const ConnectWallet = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const existingProvider = globalState.state.web3Provider;
  const onConnectWallet = async () => {
    const provider = await getWalletProvider();
    if (provider) {
      dispatch({
        type: SET_WEB3_PROVIDER,
        value: provider,
      });
    }
  };

  const onLogoutWallet = async () => {
    await logoutWeb3Modal();
    dispatch({
      type: SET_WEB3_PROVIDER,
      value: null,
    });
  };

  return (
    <>
      {existingProvider ? (
        <Button
          onClick={onLogoutWallet}
          className="btn-neutral btn-icon"
          color="default"
        >
          <span className="nav-link-inner--text ml-1">Disconnect</span>
        </Button>
      ) : (
        <Button
          onClick={onConnectWallet}
          className="btn-neutral btn-icon"
          color="default"
        >
          <span className="nav-link-inner--text ml-1">Connect</span>
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
