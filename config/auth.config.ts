export default (): Record<string, unknown> => {
  return {
    JWT_SECRET: process.env.JWT_SECRET,
  };
};
