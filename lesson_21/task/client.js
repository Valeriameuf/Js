class Client {
  constructor(id, fullname, balance) {
    this.id = id;
    this.fullname = fullname;
    this.balance = balance;
  }
  putMoney(money) {
    this.balance += money;
  }
  withdrawMoney(money) {
    if (this.balance < money) {
      throw new Error("Balance is not enough");
    }
    this.balance -= money;
  }
  toString() {
    const view = {
      type: "base client",
      id: this.id,
      fullname: this.fullname,
      balance: this.balance,
    };
    return JSON.stringify(view);
  }
}
class GoldenClient extends Client {
  constructor(id, fullname, balance, creditLimit, creditMoneyUsingPercent) {
    super(id, fullname, balance);
    this.creditLimit = creditLimit;
    this.creditMoneyUsingPercent = creditMoneyUsingPercent;
  }
  withdrawMoney(money) {
    const potentialBalance = this.balance - money;
    if (potentialBalance < -this.creditLimit) {
      throw new Error("Balance is not enough");
    }
    this.balance = potentialBalance;
  }
  getCreditMoneyPenalty() {
    if (this.balance >= 0) {
      return 0;
    }
    const usedCreditMoney = Math.abs(this.balance);
    return (usedCreditMoney / 100) * this.creditMoneyUsingPercent;
  }
  toString() {
    const view = {
      type: "golden client",
      id: this.id,
      fullname: this.fullname,
      balance: this.balance,
      creditLimit: this.creditLimit,
      creditMoneyUsingPercent: this.creditMoneyUsingPercent,
    };
    return JSON.stringify(view);
  }
}

class RegularClient extends Client {
  toString() {
    const view = {
      type: "regular client",
      id: this.id,
      fullname: this.fullname,
      balance: this.balance,
    };
    return JSON.stringify(view);
  }
}
