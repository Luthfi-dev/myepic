// msalConfig.js
const msalConfig = {
  auth: {
    clientId: "fd2fe229-28eb-4b53-b546-4bf86ca14f77",
    authority:
      "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    redirectUri: "http://localhost:3000/auth-callback",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export default msalConfig;
