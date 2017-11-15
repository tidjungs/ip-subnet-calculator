export const plus = (x, y) => x + y;

export const convertToSubnet = n => 
  [0,8,16,24].map(i => 
    parseInt(('1'.repeat(n) + '0'.repeat(32 - n)
  ).substr(i, 8), 2)).join('.');


const map = { 'ANY': 0, 'A': 7, 'B': 15, 'C': 23 }
export const generateSubnetByClass = c => 
  new Array(32 - map[c]).fill(0).map(
    (number, index) => convertToSubnet(index+1+map[c]) + ' / ' + (index+1+map[c]))

const encodeIP = ip => 
  ip.split('.')
  .map(n => '0'.repeat(8 - (+n).toString(2).length) + (+n).toString(2))
  .join('')

const decodeIP = ip => {
  const buffer = new Array(4).fill(0);
  return buffer.map((b, index) => parseInt(ip.substr(index*8, 8), 2)).join('.');
}

export const getNetWorkAddress = (ip, subnet) => {
  const a = encodeIP(ip)
    .split('')
    .map((digit, index) => index < subnet ? digit : '0')
    .join('')
  return decodeIP(a);      
}

