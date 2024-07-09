export default (): Record<string, unknown> => {
  return {
    MONGODB_URI: process.env.MONGODB_URI,
  };
};
