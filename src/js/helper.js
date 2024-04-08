<<<<<<< HEAD
// contains functions used frequently in our proj (like json will be used to get data from various objs)
=======
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387

import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url, uploadData = undefined) {
  try {
      const fetchPro = uploadData ?  fetch(url, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(uploadData) 
      }) : fetch(url);
      const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } 
    catch (err) {
      throw err;
    }
}

<<<<<<< HEAD
// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // avoid using hardnumber = 10 (magic number instead define it in config)
//     const data = await res.json(); // also returns a promise .json is a meth on response obj
//     if (!res.ok) throw new Error(data.message);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method : 'POST',
//       headers : { // headers are snippets which contains info about the request
//         'Content-Type' : 'application/json' //signifies the data will be in json format
//       },
//       body : JSON.stringify(uploadData) // body -> data we need to send
//     });
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
=======
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
