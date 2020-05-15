import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total) {
        throw new Error(
          'You can not register an outcome transaction with a value greater than your balance',
        );
      }
    }

    const transaction = new Transaction({ title, value, type });
    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
