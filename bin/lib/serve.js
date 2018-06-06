export default (path) => {
  let message;

  try {
    require(path);
    
    message = '|  ***   Starting Xprez app......  ***  |';
  } catch (e) {
    console.log(e);
    
    message = '|  ***   Failed to run Xprez app   ***  |';
  } finally {
    console.log('-----------------------------------------');
    console.log(message);
    console.log('-----------------------------------------');
  }
}