import initDB from "@/helpers/initDb";
import Balances from "@/model/Balances";

initDB();

const getBalances = async (req, res) => {
  const balances = await Balances.find();
  return res.status(200).json(balances);
};

const updateBalance = async (req, res) => {
  return res.status(200).json({ message: req.query.txn });
};

const balance = (req, res) => {
  switch (req.method) {
    case "GET": {
      getBalances(req, res);
      break;
    }
    case "PATCH": {
      updateBalance(req, res);
      break;
    }
  }
};

export default balance;
