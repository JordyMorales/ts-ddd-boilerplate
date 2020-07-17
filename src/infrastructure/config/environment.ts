import constants from "./constants";

export default (() => {
  const environment = {
    database: {
      dialect:
        process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO,
      url: process.env.DATABASE_URI || "",
    },
  };

  return environment;
})();
