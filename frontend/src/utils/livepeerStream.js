import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://zxzqymfwui.execute-api.us-east-1.amazonaws.com/dev/stream/",
  timeout: 20000,
});

export const createLivepeerStream = async (streamName) => {
  const createStreamResponse = await apiInstance.post(
    "/create-new-stream",
    {
      stream_name: streamName,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (createStreamResponse && createStreamResponse.data) {
    return createStreamResponse.data;
  }
};

export const getStreamStatus = async (streamId) => {
  const response = await apiInstance.post(
    `/stream-status`,
    {
      stream_id: streamId,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response;
};
