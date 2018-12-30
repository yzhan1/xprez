export default (req, res, next) => {
  console.log('Before request: Hello!');
  next();
}