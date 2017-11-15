import { expect } from 'chai';
import { plus, 
  convertToSubnet,
  generateSubnetByClass,
  getNetWorkAddress,
  getBroadcastAddress } from './helper';

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