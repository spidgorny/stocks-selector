import * as dotenv from "dotenv";
import axios from "axios";
import { func } from "prop-types";

function loadEnv() {
  dotenv.config({ path: "../.env" });
}

function build_params(payload: any) {
  const sp = new URLSearchParams();
  for (let key in payload) {
    sp.set(key, payload[key]);
  }
  return sp.toString();
}

async function getNewToken() {
  let tokenPayload = {
    client_id: process.env.COMDIRECT_CLIENT,
    client_secret: process.env.COMDIRECT_SECRET,
    username: process.env.COMDIRECT_USERNAME,
    password: process.env.COMDIRECT_PASSWORD,
    grant_type: "cd_secondary",
  };
  console.log(tokenPayload);
  const token = await axios.post(
    "https://api.comdirect.de/oauth/token",
    build_params(tokenPayload),
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );
  const tokenData = {
    ...token.data,
    expires_at: new Date(new Date().getTime() + token.data.expires_in),
  };
  console.log(tokenData);
  return tokenData;
}

function getToken() {
  return {
    access_token: "11a16f4f-80f2-4d9c-abbd-6277b7fcc37e",
    token_type: "bearer",
    refresh_token: "cc1d31d4-e106-48a1-b17f-748fdf7f0f92",
    expires_in: 599,
    scope: "TWO_FACTOR",
    kdnr: "9786663132",
    bpid: 4733101,
    kontaktId: 5643587539,
    expires_at: new Date("2022-01-07T14:13:42.964Z"),
  };
}

async function getTokenSomehow() {
  let token = getToken();
  console.log(token.expires_at, new Date());
  if (token.expires_at < new Date()) {
    token = await getNewToken();
  }
  return token;
}

function axiosConfig(token: any) {
  return {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "x-http-request-info": JSON.stringify({
        clientRequestId: {
          sessionId: "550e8400e29b11d4a716446655440000",
          requestId: new Date().getTime(),
        },
      }),
    },
  };
}

async function getUser(token: any) {
  let url = `https://api.comdirect.de/api/banking/clients/user/v1/accounts/balances`;
  console.log(`GET ${url}`);
  const depots = await axios.get(url, axiosConfig(token));
  console.log(depots.data);
  return depots.data;
}

async function getAccounts(token: any) {
  // const clientId = process.env.COMDIRECT_USERNAME;
  const clientId = "9786663132";
  let url = `https://api.comdirect.de/api/banking/clients/${clientId}/v2/accounts/balances`;
  console.log(`GET ${url}`);
  const depots = await axios.get(url, axiosConfig(token));
  console.log(depots.data);
  return depots.data;
}

async function getBalances(token: any) {
  const accountId = process.env.COMDIRECT_USERNAME;
  let url = `https://api.comdirect.de/api/banking/v2/accounts/${accountId}/balances`;
  console.log(`GET ${url}`);
  const depots = await axios.get(url, axiosConfig(token));
  console.log(depots.data);
  return depots.data;
}

async function getDepots(token: any) {
  const userId = process.env.COMDIRECT_USERNAME;
  let url = `https://api.comdirect.de/api/brokerage/clients/${userId}/v3/depots`;
  console.log(`GET ${url}`);
  const depots = await axios.get(url, axiosConfig(token));
  console.log(depots.data);
  return depots.data;
}

(async () => {
  loadEnv();
  try {
    const token = await getTokenSomehow();
    const user = await getUser(token);
    const accounts = await getAccounts(token);
    const balances = await getBalances(token);
    const depots = await getDepots(token);
    // const res = axios.get("/brokerage/depots/{depotId}/v3/orders");
  } catch (e) {
    if (e instanceof Error) {
      // @ts-ignore
      if (e?.response) {
        // @ts-ignore
        let response = e.response;
        console.error(response?.status);
        console.error(JSON.stringify(response?.data));
        // console.log(e);
        // @ts-ignore
        console.error(e?.request?.headers);
      } else {
        console.error(e);
      }
    }
  }
})();
