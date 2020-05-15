import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private calcValues(filter: string): number {
    return this.transactions
      .filter(transaction => transaction.type === filter)
      .reduce((accum, item) => accum + item.value, 0);
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.calcValues('income');
    const outcome = this.calcValues('outcome');
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
