import { expect } from 'chai';
import { plus, 
  convertToSubnet,
  generateSubnetByClass,
  getNetWorkAddress,
  getBroadcastAddress,
  getUsableNetworkIPRange,
  getNumberOfHost,
  getUsableNumberOfHost,
  getWildCardMask,
  getBinarySubnetMask,
  getIPClass,
  isPrivate,
  getAllPosibleHeader,
  getAllPosibleList,
  getPrefixIP } from './helper';

describe('test plus', () => {
  it('should plus number', () => {
    expect(plus(1, 2)).to.equal(3);
    expect(plus(0, 2)).to.equal(2);
  })
})

describe('test convert subnet', () => {
  it('should convert subnet', () => {
    expect(convertToSubnet(1)).to.equal('128.0.0.0')
    expect(convertToSubnet(2)).to.equal('192.0.0.0')
    expect(convertToSubnet(3)).to.equal('224.0.0.0')
    expect(convertToSubnet(16)).to.equal('255.255.0.0')
    expect(convertToSubnet(24)).to.equal('255.255.255.0')
    expect(convertToSubnet(32)).to.equal('255.255.255.255')    
  })
})


describe('test generateSubnetByClass', () => {
  it('should generateSubnetByClass', () => {
    const expectValue = [
      `${convertToSubnet(24)} / 24`,
      `${convertToSubnet(25)} / 25`,
      `${convertToSubnet(26)} / 26`,
      `${convertToSubnet(27)} / 27`,
      `${convertToSubnet(28)} / 28`,
      `${convertToSubnet(29)} / 29`,
      `${convertToSubnet(30)} / 30`,
      `${convertToSubnet(31)} / 31`,
      `${convertToSubnet(32)} / 32`,      
    ];
    const generateValue = generateSubnetByClass('C');
    expectValue.forEach((value, index) => {
      expect(generateValue[index]).to.equal(value)
    })
  })
})

describe('test getNetWorkAddress', () => {
  it('should get network address', () => {
    expect(getNetWorkAddress('158.108.12.34', 1)).to.equal('128.0.0.0')    
    expect(getNetWorkAddress('158.108.12.34', 8)).to.equal('158.0.0.0')        
    expect(getNetWorkAddress('158.108.12.34', 16)).to.equal('158.108.0.0')    
    expect(getNetWorkAddress('158.108.12.34', 24)).to.equal('158.108.12.0')
    expect(getNetWorkAddress('158.108.12.34', 27)).to.equal('158.108.12.32')        
    expect(getNetWorkAddress('158.108.12.34', 28)).to.equal('158.108.12.32')        
  })
})


describe('test getBroadcastAddress', () => {
  it('should get broadcast address', () => {
    expect(getBroadcastAddress('158.108.12.34', 1)).to.equal('255.255.255.255')    
    expect(getBroadcastAddress('158.108.12.34', 8)).to.equal('158.255.255.255')        
    expect(getBroadcastAddress('158.108.12.34', 16)).to.equal('158.108.255.255')    
    expect(getBroadcastAddress('158.108.12.34', 24)).to.equal('158.108.12.255')
    expect(getBroadcastAddress('158.108.12.34', 28)).to.equal('158.108.12.47')        
  })
})

describe('test get useable host ip', () => {
  it('should get useable host ip', () => {
    expect(getUsableNetworkIPRange('0.108.12.34', 30)).to.equal('0.108.12.33 - 0.108.12.34')    
    expect(getUsableNetworkIPRange('158.108.12.34', 30)).to.equal('158.108.12.33 - 158.108.12.34')
    expect(getUsableNetworkIPRange('158.108.12.34', 28)).to.equal('158.108.12.33 - 158.108.12.46') 
    expect(getUsableNetworkIPRange('158.108.12.34', 24)).to.equal('158.108.12.1 - 158.108.12.254')
    expect(getUsableNetworkIPRange('158.108.12.34', 16)).to.equal('158.108.0.1 - 158.108.255.254')     
    expect(getUsableNetworkIPRange('158.108.12.34', 8)).to.equal('158.0.0.1 - 158.255.255.254')    
  })
})

describe('test get number of total host', () => {
  it('should return correct number', () => {
    expect(getNumberOfHost('158.108.12.34', 1)).to.equal(2147483648)
    expect(getNumberOfHost('158.108.12.34', 8)).to.equal(16777216)
    expect(getNumberOfHost('158.108.12.34', 16)).to.equal(65536)
    expect(getNumberOfHost('158.108.12.34', 24)).to.equal(256)
    expect(getNumberOfHost('158.108.12.34', 27)).to.equal(32)
    expect(getNumberOfHost('158.108.12.34', 30)).to.equal(4)
    expect(getNumberOfHost('158.108.12.34', 31)).to.equal(2)    
    expect(getNumberOfHost('158.108.12.34', 32)).to.equal(1)
  })
})

describe('test get number of total useable host', () => {
  it('should return correct number', () => {
    const num1 = getNumberOfHost('158.108.12.34', 32);
    const num2 = getNumberOfHost('158.108.12.34', 31);
    const num3 = getNumberOfHost('158.108.12.34', 24);
    
    expect(getUsableNumberOfHost(num1)).to.equal(0)
    expect(getUsableNumberOfHost(num2)).to.equal(0)
    expect(getUsableNumberOfHost(num3)).to.equal(254)
  })
})

describe('getWildCardMask', () => {
  it('should correct wild card mask', () => {
    expect(getWildCardMask(1)).to.equal('127.255.255.255')
    expect(getWildCardMask(8)).to.equal('0.255.255.255')
    expect(getWildCardMask(16)).to.equal('0.0.255.255')        
    expect(getWildCardMask(24)).to.equal('0.0.0.255')
    expect(getWildCardMask(28)).to.equal('0.0.0.15')
    expect(getWildCardMask(31)).to.equal('0.0.0.1')
    expect(getWildCardMask(32)).to.equal('0.0.0.0')        
  })
})

describe('getBinarySubnetMask', () => {
  it('should correct binary', () => {
    expect(getBinarySubnetMask(16)).to.equal('11111111.11111111.00000000.00000000')
    expect(getBinarySubnetMask(24)).to.equal('11111111.11111111.11111111.00000000')
    expect(getBinarySubnetMask(28)).to.equal('11111111.11111111.11111111.11110000')
  })
})

describe('getIPClass', () => {
  it('should correct class', () => {
    expect(getIPClass(1)).to.equal('None')
    expect(getIPClass(8)).to.equal('A')
    expect(getIPClass(16)).to.equal('B')
    expect(getIPClass(24)).to.equal('C')    
  })
})

describe('private ip', () => {
  it('should correct private ip', () => {
    expect(isPrivate('0.0.0.0')).to.equal(false)
    expect(isPrivate('158.108.1.1')).to.equal(false)        
    expect(isPrivate('172.16.0.1')).to.equal(true)
    expect(isPrivate('172.16.0.0')).to.equal(true)
    expect(isPrivate('172.31.255.255')).to.equal(true)
    expect(isPrivate('192.168.0.0 ')).to.equal(true)
    expect(isPrivate('10.0.0.1')).to.equal(true)
  })
})

describe('test all posible header', () => {
  it('should correct header', () => {
    expect(getAllPosibleHeader('158.108.1.1', 1)).to.equal('All Possible /1 Networks')
    expect(getAllPosibleHeader('158.108.1.1', 8)).to.equal('All Possible /8 Networks for 158.*.*.*')
    expect(getAllPosibleHeader('158.108.1.1', 16)).to.equal('All Possible /16 Networks for 158.108.*.*')
    expect(getAllPosibleHeader('158.108.1.1', 24)).to.equal('All Possible /24 Networks for 158.108.1.*')    
  })
})

describe('test all posiblie network', () => {
  it('should length of list', () => {
    expect(getAllPosibleList('158.108.1.1', 1).length).to.equal(2)
    expect(getAllPosibleList('158.108.1.1', 2).length).to.equal(4)
    expect(getAllPosibleList('158.108.1.1', 3).length).to.equal(8)
    expect(getAllPosibleList('158.108.1.1', 4).length).to.equal(16)
    expect(getAllPosibleList('158.108.1.1', 7).length).to.equal(128) 
    expect(getAllPosibleList('158.108.1.1', 8).length).to.equal(1)        
    expect(getAllPosibleList('158.108.1.1', 15).length).to.equal(128)        
    expect(getAllPosibleList('158.108.1.1', 16).length).to.equal(1)        
    expect(getAllPosibleList('158.108.1.1', 23).length).to.equal(128)        
    expect(getAllPosibleList('158.108.1.1', 24).length).to.equal(1)        
    expect(getAllPosibleList('158.108.1.1', 31).length).to.equal(128)        
    expect(getAllPosibleList('158.108.1.1', 31).length).to.equal(128)        
  })
})

describe('test prefix', () => {
  it('should correct prefix', () => {
    expect(getPrefixIP('158.108.1.1', 1)).to.equal('')
    expect(getPrefixIP('158.108.1.1', 8)).to.equal('10011110')    
    expect(getPrefixIP('158.108.1.1', 16)).to.equal('1001111001101100')
    expect(getPrefixIP('158.108.1.1', 24)).to.equal('100111100110110000000001')
    expect(getPrefixIP('158.108.1.1', 32)).to.equal('100111100110110000000001')
  })
})

