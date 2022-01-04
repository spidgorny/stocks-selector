import { setupCache } from "axios-cache-adapter";
import axios from "axios";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  // debug: true,
  exclude: {
    query: false,
  },
});

export function getAxios() {
  // Create `axios` instance passing the newly created `cache.adapter`
  const api = axios.create({
    adapter: cache.adapter,
  });
  return api;
}
