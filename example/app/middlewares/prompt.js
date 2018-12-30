export default (req, res, next) => {
  console.log('Before request: What would you like to eat today?');
  next();
};