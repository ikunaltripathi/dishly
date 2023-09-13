import { TIMEOUT_SEC } from './config.js';

// contains functions used frequently in our proj (like json will be used to get data from various objs)
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // avoid using hardnumber = 10 (magic number instead define it in config)
    const data = await res.json(); // also returns a promise .json is a meth on response obj
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};
