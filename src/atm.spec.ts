import { InvalidParamError } from './invalid-param-error'
import { ATM } from './atm'

describe('ATM', () => {
  it('should throw when bills are not in descending order', () => {
    const unorderedBills = [200, 100, 20, 50, 10]
    const billAmmounts = [10, 10, 10, 10, 10]
    expect(() => new ATM(unorderedBills, billAmmounts)).toThrow(InvalidParamError)
  })

  it('should throw when bills and bill ammounts are not the same size', () => {
    const bills = [200, 100, 50, 20, 10]
    const billAmmounts = [10, 10, 10, 10]

    expect(() => new ATM(bills, billAmmounts)).toThrow(InvalidParamError)
  })

  it('should return correct configuration for a given withdrawal ammount', () => {
    const bills = [100, 50, 20, 10]
    const billAmmounts = [10, 10, 10, 10] 

    const initialVariation = new Array(4).fill(0)
    const withdrawalAmmount = 300

    const result = ATM.solutions(bills, billAmmounts, initialVariation, withdrawalAmmount, 0)
    
    expect(result).toContainEqual([2, 2, 0, 0])
    expect(result).toContainEqual([1, 3, 2, 1])
  })

  it('should return 2 configurations, one with more higher bills and another with more lower bills', () => {
    const billAmmounts = [10, 10, 10, 10] 
    const bills = [100, 50, 20, 10]

    const atm = new ATM(bills, billAmmounts)
    const { moreHigherBills, moreLowerBills } = atm.getConfigurations(300)
    
    const higherBills = summation(moreHigherBills)
    const lowerBills = summation(moreLowerBills)

    expect(higherBills).toBeLessThan(lowerBills)
  })
})

const summation = (arr: number[]): number => arr.reduce((a, b) => a + b, 0)
