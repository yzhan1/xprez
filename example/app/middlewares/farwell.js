export default (req, res, next) => {
  console.log('After request: Bye!');
  next();
};