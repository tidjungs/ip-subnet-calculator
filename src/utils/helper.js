const map = { 'ANY': 0, 'A': 7, 'B': 15, 'C': 23 };
const privateIP = [
  { start: '10.0.0.0', end: '10.255.255.255' },
  { start: '172.16.0.0', end: '172.31.255.255' },
  { start: '192.168.0.0', end: '192.168.255.255' },  
];

export const plus = (x, y) => x + y;

export const convertToSubnet = n => 
  [0,8,16,24].map(i => 
    parseInt(('1'.repeat(n) + '0'.repeat(32 - n)
  ).substr(i, 8), 2)).join('.');

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

export const getBinarySubnetMask = n =>
  new Array(4).fill(0).map((b, index) => 
    encodeIP(convertToSubnet(n)).substr(index*8, 8)
  ).join('.');

export const getIPClass = n => {
  if (n < 8) return 'None';
  else if (n < 16) return 'A';
  else if (n < 24) return 'B';
  return 'C';
}

const convertIPtoInt = ip => parseInt(encodeIP(ip), 2);

export const isPrivate = ip => {
  const ipInt = convertIPtoInt(ip);
  for (const set of privateIP) {
    if (ipInt >= convertIPtoInt(set.start) && ipInt <= convertIPtoInt(set.end)) {
      return true;
    }
  }
  return false;
}

export const getResult = (ip, subnet) => [
  { name: 'IP Address', value: ip },
  { name: 'Network Address', value: getNetWorkAddress(ip, subnet) },
  { name: 'Usable Host IP Range', value: getUsableNetworkIPRange(ip, subnet) },
  { name: 'Broadcast Address', value: getBroadcastAddress(ip, subnet) },
  { name: 'Total Number of Hosts', value: getNumberOfHost(ip, subnet) },
  { name: 'Number of Usable Hosts', value: getUsableNumberOfHost(getNumberOfHost(ip, subnet)) },
  { name: 'Subnet Mask', value: convertToSubnet(subnet) },
  { name: 'Wildcard Mask', value: getWildCardMask(subnet) },
  { name: 'Binary Subnet Mask', value: getBinarySubnetMask(subnet) },
  { name: 'IP Class', value: getIPClass(subnet) },
  { name: 'CIDR Notation', value: '/' + subnet },
  { name: 'IP Type', value: isPrivate(ip) ? 'Private' : 'Public' },
  { name: 'Short', value: ip + '/' + subnet },
  { name: 'Binary ID', value: encodeIP(ip) },
  { name: 'Integer ID', value: parseInt(encodeIP(ip), 2) },
  { name: 'Hex ID', value: parseInt(encodeIP(ip), 2).toString(16) }
]