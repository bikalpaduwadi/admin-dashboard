import mongoose from 'mongoose';
import { Request, Response } from 'express';

import User from '../models/User';
import Transaction from '../models/Transaction';

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');

    res.status(200).json(admins);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliatestats'
        }
      },
      { $unwind: '$affiliatestats' }
    ]);

    console.log(userWithStats);

    const salesTransactions = await Promise.all(
      userWithStats[0].affiliatestats.affiliateSales.map((id: string) => Transaction.findById(id))
    );

    const filteredSalesTransaction = salesTransactions.filter(transaction => !!transaction);

    res.status(200).json({ user: userWithStats[0], sales: filteredSalesTransaction });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
