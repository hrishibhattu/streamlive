import { create } from "ipfs-http-client";
import IPFS from "ipfs-api";
import axios from "axios";

const ifpsConfig = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
};

const ipfs = new IPFS(ifpsConfig);
const ipfsCreate = create(ifpsConfig);

const addImageToIPFS = async (imageBuffer) => {
  const ipfsHash = await ipfs.add(imageBuffer);
  return ipfsHash[0].hash;
};

export const addCreator = async (
  username,
  fullName,
  description,
  socialMedia,
  displayImageHash,
  creatorAddress
) => {
  const tokenMetaData = JSON.stringify({
    username: username,
    fullName: fullName,
    description: description,
    socialMedia: socialMedia,
    userImage: displayImageHash,
    creatorAddress: creatorAddress,
  });

  const hash = await ipfsCreate.add(tokenMetaData);
  return hash.cid.toString();
};

export const uploadMetadataToIPFS = async (
  jsonData,
  socialLinks,
  bufferImage
) => {
  const ipfsImageHash = await addImageToIPFS(bufferImage);
  return await addCreator(
    jsonData.username,
    jsonData.fullName,
    jsonData.description,
    socialLinks,
    ipfsImageHash,
    jsonData.creatorAddress
  );
};

export const retrieveDataFromIPFS = (ipfsHash) => {
  return axios.get(`https://ipfs.infura.io:5001/api/v0/cat?arg=${ipfsHash}`);
};

export const retrieveImageFromIPFS = (ipfsHash) => {
  const config = {
    url: `https://ipfs.infura.io:5001/api/v0/cat?arg=${ipfsHash}`,
    method: "GET",
    responseType: "blob",
  };
  return axios(config);
};
