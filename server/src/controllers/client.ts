import { Request, Response } from 'express';

import User from '../models/User';
import Product from '../models/Product';
import ProductStat from '../models/ProductStat';
import Transaction from '../models/Transaction';
import getCountryISO3 from 'country-iso-2-to-3';
import { generateFormattedSort } from '../utils/misc';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    // getAlpha3Code('ss')

    const productsWithStats = await Promise.all(
      products.map(async product => {
        const stat = await ProductStat.find({
          productId: product._id
        });

        return {
          ...(product as any)._doc,
          stat: stat && stat[0]
        };
      })
    );

    console.log('productsWithStats: ', productsWithStats.length);

    res.status(200).json(productsWithStats);
  } catch (error: any) {
    console.log('Error: ', error);
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: 'user' }).select('-password');

    res.status(200).json(customers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    console.log('Im here');
    // Incoming sort object example: {'field': 'userId', 'sort': 'desc'}
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

    // Formatted sort example: {userId: 1}
    const formattedSort = generateFormattedSort(sort?.toString()) || {};
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search?.toString(), 'i') } },
        { userId: { $regex: new RegExp(search?.toString(), 'i') } }
      ]
    })
      .sort(formattedSort)
      .skip(Number(page) * Number(pageSize))
      .limit(Number(pageSize));

    const total = await Transaction.countDocuments({
      userId: { $regex: search?.toString() || '', $options: 'i' }
    });

    console.log('total...', total);
    console.log('search...', search?.toString());

    res.status(200).json({
      transactions,
      total
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getGeography = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc: Record<string, number>, user) => {
      const { country } = user;
      const countryISO3 = getCountryISO3(country || '');

      if (countryISO3) {
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }

        acc[countryISO3]++;
      }

      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(([country, value]) => ({ id: country, value }));

    res.status(200).json(formattedLocations);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
