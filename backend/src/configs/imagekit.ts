import ImageKit from "imagekit";
import { ENV_VARS } from "./envVars.ts";


const imagekit = new ImageKit({
    publicKey: ENV_VARS.IMAGEKIT_PUBLIC_KEY,
    privateKey: ENV_VARS.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: ENV_VARS.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;