const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.setMaxListeners(20);

app.use(cors());
app.use(bodyParser.json());

const authenticate = async (req, res, next) => {
  const idToken = req.header("Authorization");
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Check Email Endpoint
app.post("/api/checkUserExistence", async (req, res) => {
  const { email } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(userRecord.uid)
      .get();

    if (userSnapshot.exists && userSnapshot.data()) {
      res.json({ exists: true });
    } else {
      console.log("User does not exist in Firestore");

      res.json({ exists: false });
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.json({ exists: false });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Signup Endpoints
app.post("/signup/email", async (req, res) => {
  const { email, password, firstName, lastName, country, currency, avgIncome } =
    req.body;
  const defaultIncomeCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Savings",
  ];
  const defaultExpenseCategories = ["Rent", "Utilities", "Groceries"];

  try {
    const userCredential = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    const userUID = userCredential.uid;

    await admin
      .firestore()
      .collection("users")
      .doc(userUID)
      .set({
        firstName,
        lastName,
        country,
        currency,
        avgIncome,
        categories: {
          incomeCategories: defaultIncomeCategories,
          expenseCategories: defaultExpenseCategories,
        },
      });

    const walletRef = await admin
      .firestore()
      .collection("users")
      .doc(userUID)
      .collection("user_wallets")
      .add({
        walletName: "Main Wallet",
      });

    const transaction = {
      type: "income",
      title: "salary",
      amount: avgIncome,
      category: "Salary",
      date: new Date().toISOString().split("T")[0],
      description: "Monthly Salary",
      recurring: true,
    };
    await axios.post(
      `http://localhost:3002/user/transaction/${userUID}/${walletRef.id}`,
      transaction,
    );

    res.status(201).json({ success: true, user: userUID });
  } catch (error) {
    console.error("Error signing up:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup/google/:userId", async (req, res) => {
  const uid = req.params.userId;
  const { firstName, lastName, country, currency, avgIncome } = req.body;
  const defaultIncomeCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Savings",
  ];
  const defaultExpenseCategories = ["Rent", "Utilities", "Groceries"];

  try {
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .set({
        firstName,
        lastName,
        country,
        currency,
        avgIncome,
        categories: {
          incomeCategories: defaultIncomeCategories,
          expenseCategories: defaultExpenseCategories,
        },
      });

    const walletRef = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("user_wallets")
      .add({
        walletName: "Main Wallet",
      });

    const transaction = {
      type: "income",
      title: "salary",
      amount: avgIncome,
      category: "Salary",
      date: new Date().toISOString().split("T")[0],
      description: "Monthly Salary",
      recurring: true,
    };
    await axios.post(
      `http://localhost:3002/user/transaction/${uid}/${walletRef.id}`,
      transaction,
    );

    res.status(200).json({ message: "Google sign-up successful" });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Delete User Endpoint
app.post("/delete/:userId", async (req, res) => {
  const userid = req.params.userId;

  try {
    await admin.auth().deleteUser(userid);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add Transaction Endpoint
app.post("/user/transaction/:userID/:walletID", async (req, res) => {
  try {
    const { title, amount, category, date, description, recurring, type } =
      req.body;
    const userID = req.params.userID;
    const walletID = req.params.walletID;

    const transactionDocRef = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("user_wallets")
      .doc(walletID)
      .collection("user_transactions")
      .add({
        title,
        amount,
        category,
        date: admin.firestore.Timestamp.fromDate(new Date(date)),
        description,
        recurring,
        type,
      });

    res
      .status(201)
      .json({ success: true, transactionID: transactionDocRef.id });

    if (recurring === "true") {
      const currentDate = new Date(date);
      currentDate.setMonth(currentDate.getMonth() + 1);

      const newTransaction = {
        title,
        amount,
        category,
        date: admin.firestore.Timestamp.fromDate(currentDate),
        description,
        recurring,
        type,
        userID,
      };

      try {
        const userToken = "b08502d697e50b56a999fd1d7042dc79";
        const newTransactionString = JSON.stringify(newTransaction);
        const postEndpoint =
          "https://gmi0yl-ip-156-213-152-119.tunnelmole.net/user/transaction";

        const response = await axios.get(
          `https://www.easycron.com/rest/add?token=${userToken}&cron_job_name=${userID}&cron_expression=0%200%20${currentDate.getDate()}%20${
            currentDate.getMonth() + 1
          }%20*&url=${postEndpoint}&method=POST&headers=Content-Type:application/json|Authorization:b08502d697e50b56a999fd1d7042dc79&body=${encodeURIComponent(
            newTransactionString,
          )}`,
        );
        console.log("Recurring transaction scheduled:", response.data);
      } catch (error) {
        console.error("Error scheduling recurring transaction:", error);
      }
    }
  } catch (error) {
    console.error("Error adding recurring transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve Categoris Endpoint
app.get("/user/getExpenseCategories/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const categoriesSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .get();
    if (!categoriesSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const categoriesData = categoriesSnapshot.data().categories;
    const expenseCategories = categoriesData.expenseCategories || [];

    res.status(200).json({ expenseCategories });
  } catch (error) {
    console.error("Error fetching expense categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/getIncomeCategories/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const categoriesSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(userID)
      .get();
    if (!categoriesSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const categoriesData = categoriesSnapshot.data().categories;
    const incomeCategories = categoriesData.incomeCategories || [];

    res.status(200).json({ incomeCategories });
  } catch (error) {
    console.error("Error fetching income categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve Transactions Endpoint
app.get("/user/getTransactions/:userID/:walletID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const walletID = req.params.walletID;

    const userTransactionsRef = admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("user_wallets")
      .doc(walletID)
      .collection("user_transactions");
    const snapshot = await userTransactionsRef.get();

    let transactions = [];
    snapshot.forEach((doc) => {
      transactions.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Transactions Endpoint
app.put("/user/updateTransaction/:userID/:walletID/:transactionID",
  async (req, res) => {
    try {
      const { title, amount, category, date, description, recurring } =
        req.body;
      const { userID, walletID, transactionID } = req.params;

      const transactionRef = admin
        .firestore()
        .collection("users")
        .doc(userID)
        .collection("user_wallets")
        .doc(walletID)
        .collection("user_transactions")
        .doc(transactionID);

      await transactionRef.update({
        title: title,
        amount: amount,
        category: category,
        date: admin.firestore.Timestamp.fromDate(new Date(date)),
        description: description,
        recurring: recurring,
      });

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Delete Transactions Endpoint
app.delete("/user/deleteTransaction/:userID/:walletID/:transactionID",
  async (req, res) => {
    try {
      const { userID, walletID, transactionID } = req.params;

      const transactionRef = admin
        .firestore()
        .collection("users")
        .doc(userID)
        .collection("user_wallets")
        .doc(walletID)
        .collection("user_transactions")
        .doc(transactionID);

      await transactionRef.delete();

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Get User Wallets
app.get("/user/wallets/:userID", async (req, res) => {
  const userid = req.params.userID;

  try {
    const walletsRef = admin
      .firestore()
      .collection("users")
      .doc(userid)
      .collection("user_wallets");
    const walletsSnapshot = await walletsRef.get();

    let wallets = [];

    walletsSnapshot.forEach((doc) => {
      wallets.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({ wallets });
  } catch (error) {
    console.error("Error retrieving wallets:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/getTotalIncome/:userID/:walletID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const walletID = req.params.walletID;

    const userTransactionsRef = admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("user_wallets")
      .doc(walletID)
      .collection("user_transactions");
    const snapshot = await userTransactionsRef.get();

    // Calculate total income
    let totalIncome = 0;
    snapshot.forEach((doc) => {
      const transaction = doc.data();
      if (transaction.type === "income") {
        totalIncome += parseFloat(transaction.amount);
      }
    });

    // Round the total income to two decimal places
    totalIncome = parseFloat(totalIncome.toFixed(2));

    res.status(200).json({
      totalIncome,
    });
  } catch (error) {
    console.error("Error retrieving total income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/getTotalExpense/:userID/:walletID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const walletID = req.params.walletID;

    const userTransactionsRef = admin
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("user_wallets")
      .doc(walletID)
      .collection("user_transactions");
    const snapshot = await userTransactionsRef.get();

    // Calculate total expense
    let totalExpense = 0;
    snapshot.forEach((doc) => {
      const transaction = doc.data();
      if (transaction.type === "expense") {
        totalExpense += parseFloat(transaction.amount);
      }
    });

    // Round the total expense to two decimal places
    totalExpense = parseFloat(totalExpense.toFixed(2));

    res.status(200).json({
      totalExpense,
    });
  } catch (error) {
    console.error("Error retrieving total expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
