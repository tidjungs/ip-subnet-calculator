export const plus = (x, y) => x + y;

export const convertToSubnet = n => 
  [0,8,16,24].map(i => 
    parseInt(('1'.repeat(n) + '0'.repeat(32 - n)
  ).substr(i, 8), 2)).join('.');

const map = { 'ANY': 0, 'A': 7, 'B': 15, 'C': 23 }
export const generateSubnetByClass = c => 
  new Array(32 - map[c]).fill(0).map(
    (number, index) => convertToSubnet(index+1+map[c]) + ' / ' + (index+1+map[c]))

/*
    encoder and decoder
*/
const encodeIP = ip => 
  ip.split('.')
  .map(n => '0'.repeat(8 - (+n).toString(2).length) + (+n).toString(2))
  .join('')

const decodeIP = ip => {
  const buffer = new Array(4).fill(0);
  const ip32bit = '0'.repeat(32 - ip.length) + ip;
  return buffer.map((b, index) => parseInt(ip32bit.substr(index*8, 8), 2)).join('.');
}

export const getNetWorkAddress = (ip, subnet) => {
  const a = encodeIP(ip)
    .split('')
    .map((digit, index) => index < subnet ? digit : '0')
    .join('')
  return decodeIP(a);      
}

export const getBroadcastAddress = (ip, subnet) => {
  const a = encodeIP(ip)
    .split('')
    .map((digit, index) => index < subnet ? digit : '1')
    .join('')
  return decodeIP(a);      
}

export const getNumberOfHost = (ip, subnet) => {
  const address = encodeIP(
    getNetWorkAddress(ip, subnet)
  );
  const broadcast = encodeIP(
    getBroadcastAddress(ip, subnet)
  );
  return parseInt(broadcast, 2) - parseInt(address, 2) + 1;
}

export const getUsableNumberOfHost = numberOfHost => 
  numberOfHost === 1 ? 0 : numberOfHost - 2;

export const getUsableNetworkIPRange = (ip, subnet) => {
  const totalHost = getNumberOfHost(ip, subnet);
  const useableTotalHost = getUsableNumberOfHost(totalHost);
  if (useableTotalHost === 0) {
    return 'None';
  }
  const address = parseInt(encodeIP(
    getNetWorkAddress(ip, subnet)
  ), 2);
  const broadcast = parseInt(encodeIP(
    getBroadcastAddress(ip, subnet)
  ), 2);
  return decodeIP((address+1).toString(2)) + ' - ' + decodeIP((broadcast-1).toString(2));
}

export const getWildCardMask = n => decodeIP((~parseInt(encodeIP(convertToSubnet(n)), 2)).toString(2))

