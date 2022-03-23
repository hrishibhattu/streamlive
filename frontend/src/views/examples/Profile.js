import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  UncontrolledAlert,
} from "reactstrap";
import { BigNumber } from "@ethersproject/bignumber";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import HeroComponent from "../../components/Hero/hero";
import {
  SpinnerComponent,
  SpinnerComponentTailSpin,
} from "../../components/Spinner";
import { burnerContract, CreatorContract } from "../../smartContract";
import {
  retrieveDataFromIPFS,
  retrieveImageFromIPFS,
} from "../../utils/ipfsConfig";
import { getLocalProvider } from "../../utils/connectWallet";
import { createLivepeerStream } from "../../utils/livepeerStream";
import { store } from "../../store/store";

const defaultImage =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

const Profile = (props) => {
  const globalState = useContext(store);
  const { web3Provider } = globalState.state;

  const [userData, setUserData] = useState();
  const [creatorContractAddress, setCreatorContractAddress] = useState();
  const [isStreamCreated, setIsStreamCreated] = useState();

  const [liveStream, setLivestream] = useState();

  const [creatorExists, setCreatorExists] = useState();
  const [stats, setStats] = useState();
  const creatorAddress = props.match.params.address;

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    const getCreatorId = async () => {
      let id = await burnerContract.getCreatorIdFromAddress(creatorAddress);
      id = parseInt(id.toString());
      const creatorHash = await burnerContract.getCreatorFromId(id);

      if (creatorHash[0] === "Paradise Biryani") {
        setCreatorExists("Creator is not registered!");
        return;
      }
      const creatorContractAddress = await burnerContract.getContractFromId(id);

      const localProvider = await getLocalProvider().getSigner();
      const creatorContract = new CreatorContract(
        localProvider,
        creatorContractAddress[0]
      );
      const creatorBalance = await creatorContract.creatorBalance();
      const fanCount = await creatorContract.totalFanCount();
      const fanDepositAmount = 0;
      //await creatorContract.fanDepositAmount();
      const stats = {
        creatorBalance: creatorBalance.toString(),
        fanCount: fanCount.toString(),
        fanDepositAmount: fanDepositAmount.toString(),
      };

      let userData = await retrieveDataFromIPFS(creatorHash);
      userData = userData.data;
      const userImageHash = userData["userImage"];
      const userImageFromIpfs = await retrieveImageFromIPFS(userImageHash);
      const imgSrc = URL.createObjectURL(userImageFromIpfs.data);
      userData["imgSrc"] = imgSrc;

      setUserData(userData);
      setCreatorContractAddress(creatorContractAddress);
      setStats(stats);
    };

    getCreatorId();
  }, [creatorAddress]);

  const depositCreator = async (e) => {
    e.preventDefault();
    if (!web3Provider) {
      console.log("web3Provider is not defined");
      setShowAlert(true);
      return;
    }
    const contract = new CreatorContract(
      web3Provider.getSigner(),
      creatorContractAddress[0]
    );
    await contract.depositFunds(BigNumber.from("42"));
  };

  const createLiveStream = async () => {
    setIsStreamCreated(true);
    const streamCreateResponse = await createLivepeerStream(creatorAddress);
    if (streamCreateResponse) {
      const { stream_id, playbackId, streamKey } = streamCreateResponse;
      setLivestream({
        streamId: stream_id,
        playbackId: playbackId,
        streamKey: streamKey,
      });
      setIsStreamCreated(false);
    }
  };

  const withdrawPool = async (e) => {
    e.preventDefault();
    if (!web3Provider) {
      console.log("web3Provider is not defined");
      setShowAlert(true);
      return;
    }

    const contract = new CreatorContract(
      web3Provider.getSigner(),
      creatorContractAddress[0]
    );
    await contract.withdrawFundsFan();
  };

  const approveDeposit = async (e) => {
    e.preventDefault();
    if (!web3Provider) {
      console.log("Web3Model not found");
      setShowAlert(true);
      return;
    }
    const contract = new CreatorContract(
      web3Provider.getSigner(),
      creatorContractAddress[0]
    );
    contract.approveWETH();
  };

  const truncateString = (str, num) =>
    str.slice(0, num / 2) + "..." + str.slice(str.length - num / 2, str.length);

  return creatorExists ? (
    <div>{creatorExists}</div>
  ) : (
    <>
      <DemoNavbar />
      <main className="profile-page">
        <section className="section section-lg landing-page pb-250">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          {showAlert && (
            <UncontrolledAlert color="warning" fade={false}>
              <span className="alert-inner--icon">
                <i className="ni ni-notification-70" />
              </span>{" "}
              <span className="alert-inner--text">
                <strong>Warning!</strong> Wallet is not connected!
              </span>
            </UncontrolledAlert>
          )}

          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
          <HeroComponent size="4" />
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                {userData ? (
                  <>
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <img
                            alt={userData.username}
                            className="my-rounded-cirlce"
                            src={
                              userData["imgSrc"]
                                ? userData["imgSrc"]
                                : defaultImage
                            }
                          />
                        </div>
                      </Col>
                      <Col
                        className="order-lg-3 text-lg-right align-self-lg-center"
                        lg="4"
                      >
                        <div className="card-profile-actions py-4 mt-lg-0">
                          <Button
                            color="info"
                            onClick={createLiveStream}
                            size="sm"
                          >
                            Go Live
                          </Button>
                          <Button color="info" onClick={withdrawPool} size="sm">
                            Withdraw
                          </Button>

                          <Button
                            color="default"
                            onClick={depositCreator}
                            size="sm"
                          >
                            Deposit
                          </Button>

                          <Button
                            color="default"
                            onClick={approveDeposit}
                            size="sm"
                          >
                            Approve
                          </Button>
                        </div>
                      </Col>
                      <Col className="order-lg-1" lg="4">
                        {stats && (
                          <div className="card-profile-stats d-flex justify-content-center">
                            <div>
                              <span className="heading">{stats.fanCount}</span>
                              <span className="description">Stakers</span>
                            </div>
                            <div>
                              <span className="heading">
                                {stats.creatorBalance}
                              </span>
                              <span className="description">Staked</span>
                            </div>
                            <div>
                              <span className="heading">
                                {stats.fanDepositAmount}
                              </span>
                              <span className="description">Earned</span>
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <div className="text-center mt-5">
                      <h3>{userData.username}</h3>
                      <div className="h6 font-weight-300">
                        {truncateString(userData.creatorAddress, 10)}
                      </div>

                      {isStreamCreated && (
                        <>
                          Creating stream, please wait.
                          <div className="flex justify-content-center">
                            <SpinnerComponentTailSpin />
                          </div>
                        </>
                      )}
                      {liveStream && (
                        <>
                          <div className="mb-2">
                            You stream has been created.
                          </div>
                          <div className="mb-2">
                            Ingest URL: rtmp://rtmp.livepeer.com/live/ <br />
                            Stream Key: {liveStream.streamKey} <br />
                            Playback URL: {liveStream.playbackId}
                          </div>
                          <Link
                            to={`/stream/${liveStream.streamId}/${liveStream.playbackId}`}
                          >
                            <Button color="info" size="sm">
                              Take me to the stream
                            </Button>
                          </Link>
                          <div className="text-red-500 text-sm mt-2">
                            <span className="font-bold">Note:&nbsp;</span> To
                            start a video stream, please use a broadcaster
                            software like OBS/Streamyard on desktop, or Larix on
                            mobile
                          </div>
                        </>
                      )}
                      <div className="h6 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        {userData.fullName}
                      </div>
                      <div>
                        <Button
                          className="btn-icon-only rounded-circle mr-2"
                          href={userData.socialMedia.twitterHandle}
                          target="_blank"
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle mr-2"
                          href={userData.socialMedia.instagramHandle}
                          target="_blank"
                        >
                          <i className="fa fa-instagram" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle mr-2"
                          href={userData.socialMedia.youtubeChannel}
                          target="_blank"
                        >
                          <i className="fa fa-youtube" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-5 py-5 border-top text-center">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          <p>{userData.description}</p>
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-content-center my-5">
                    <SpinnerComponent />
                  </div>
                )}
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <CardsFooter />
    </>
  );
};

export default Profile;
