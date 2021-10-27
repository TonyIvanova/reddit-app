
export const convertTime = (unix_timestamp) => {
    
    var date = new Date(unix_timestamp * 1000);
    var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
}


export const upsconverter = (number) => {
  if (number/1000000 >= 1) return `${Math.floor(number/1000000)}M`
  else if (number/1000 >= 1) return `${Math.floor(number/100)/10}k`
  else return number 
}