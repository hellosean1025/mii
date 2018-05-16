const fs = require('fs')

function isUpper(code) {
  return code === code.toUpperCase()
}

exports.isUpper = isUpper

exports.routerNameRegexp = /^[a-z]+[a-z0-9\-]+$/;
exports.moduleNameRegexp = /^[a-z]+[A-Za-z0-9]+$/


exports.pathToMethodName = function(name){
  if(!name)return name;
  let arr = name.split('')  
  arr[0] = arr[0].toUpperCase();
  let newStr= arr[0]

  for(let i =1; i< arr.length; i++){
    if(arr[i] === '-'){
      i++;
      newStr += arr[i].toUpperCase()
      continue;
    }else newStr += arr[i]
  }
  return newStr;
}

exports.endWith = function endWith(str, endStr){
  var d=str.length-endStr.length;
  if(d>=0&&str.lastIndexOf(endStr) === d){
    return str.substr(0, d)
  }
  return false;
}


exports.clearArray = function clearArray(a) {
  return a.splice(0, a.length);
}

function fileExist(filePath){
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
exports.fileExist = fileExist;


function dirExist(filePath){
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}
exports.dirExist = dirExist;