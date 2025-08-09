import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store"; // import store ở trên
import LiveStream from "./liveStream";

const LiveStreaming: React.FC = () => {
  return (
    <Provider store={store}>
      <LiveStream />
    </Provider>
  );
};

export default LiveStreaming;
