import React, { useState } from "react";

import AppBody from "./AppBody";
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import { getStreamStatus } from "../../utils/livepeerStream";

export default function LivepeerStream(props) {
  const streamId = props.match.params.streamId;
  const playbackId = props.match.params.playbackId;
  const [streamIsActive, setStreamIsActive] = useState(false);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    let interval;
    if (streamId) {
      interval = setInterval(async () => {
        const streamStatusResponse = await getStreamStatus(streamId);
        if (streamStatusResponse.data) {
          const { isActive } = streamStatusResponse.data;
          setStreamIsActive(isActive);
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [streamId]);

  return (
    <>
      <DemoNavbar />
      <div className="section section-lg landing-page">
        <AppBody playbackId={playbackId} streamIsActive={streamIsActive} />
      </div>
      <CardsFooter />
    </>
  );
}
