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
  getBinarySubnetMask } from './helper';

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