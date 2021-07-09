import { InvalidParamError } from './invalid-param-error'

export class ATM {
  private readonly billAmmounts: number[]
  private readonly bills: number[]
  
  constructor(bills: number[], billAmmounts: number[]) {
    if (!ATM.isDescending(bills)) throw new InvalidParamError()

    if (bills.length !== billAmmounts.length) throw new InvalidParamError()

    this.bills = bills
    this.billAmmounts = billAmmounts
  }

  public getConfigurations(ammount: number): IConfigurations {
    const billsCopy = this.bills
    const billAmmountsCopy = this.billAmmounts

    const initalVariation = new Array(this.bills.length).fill(0)
    const allSolutions = ATM.solutions(billsCopy, billAmmountsCopy, initalVariation, ammount, 0)
    const configurations: IConfigurations = {
      moreHigherBills: allSolutions[0],
      moreLowerBills: allSolutions[allSolutions.length - 1],
    }

    return configurations
  }

  public static solutions(bills: number[], ammounts: number[], variation: number[], ammount: number, position: number): number[][] {
    const list: number[][] = []
    const value	= ATM.compute(bills, variation)

    if (value < ammount) {
      for (let i = position; i < bills.length; i++) {
	if (ammounts[i] > variation[i]) {
	  const newVariation: number[] = [...variation]
	  newVariation[i]++

	  const newList =  ATM.solutions(bills, ammounts, newVariation, ammount, i)

	  if (newList !== null) list.push(...newList)


	}
      }
    } else if (value === ammount) {
      list.push(ATM.myCopy(variation))
    }
    return list
  }

  public static compute(bills: number[], variation: number[]): number {
    let ret = 0
    for (let i = 0; i < variation.length; i++) {
      ret += bills[i] * variation[i]
    }

    return ret
  }

  public static myCopy(ar: number[]): number[] {
    let ret: number[] = new Array(ar.length)

    for (let i = 0; i < ar.length; i++) {
      ret[i] = ar[i]
    }

    return ret
  }

  public static isDescending(array: number[]): boolean {
    return array.every((x, i) => i === 0 || x < array[i - 1])
  }
}

export interface IConfigurations {
  moreHigherBills: number[]
  moreLowerBills: number[]
}
