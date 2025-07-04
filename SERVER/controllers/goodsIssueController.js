// // const GoodsIssue = require('../models/GoodsIssue');
// // const generateDocNumber = require('../utils/generateDocNumber');

// // // POST /api/goodsissue
// // const createGoodsIssue = async (req, res) => {
// //   try {
// //     const data = req.body;

// //     if (!data.category) {
// //       return res.status(400).json({ message: "Category is required" });
// //     }

// //     const docnumber = await generateDocNumber(data.category);

// //     const newIssue = new GoodsIssue({
// //       ...data,
// //       docnumber
// //     });

// //     await newIssue.save();
// //     res.status(201).json({ message: "Goods issue created", docnumber });
// //   } catch (err) {
// //     console.error("Error saving goods issue:", err);
// //     res.status(500).json({ message: "Internal Server Error", error: err.message });
// //   }
// // };

// // // GET /api/goodsissue
// // const getAllGoodsIssues = async (req, res) => {
// //   try {
// //     const issues = await GoodsIssue.find().sort({ createdAt: -1 });
// //     res.json(issues);
// //   } catch (err) {
// //     console.error("Error fetching goods issues:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // module.exports = {
// //   createGoodsIssue,
// //   getAllGoodsIssues
// // };

// const GoodsIssue = require('../models/GoodsIssue');
// const GoodsIssueCategory = require('../models/GoodsIssueCategory'); // ensure this model exists

// // POST /api/goodsissue
// const createGoodsIssue = async (req, res) => {
//   try {
//     const data = req.body;

//     // Validate category name
//     if (!data.category) {
//       return res.status(400).json({ message: "Category is required" });
//     }

//     // Fetch category info from DB
//     const category = await GoodsIssueCategory.findOne({ categoryName: data.category });

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // Count goods issues already created with this category
//     const issueCount = await GoodsIssue.countDocuments({ category: data.category });

//     const nextNumber = category.rangeStart + issueCount;

//     // Optional: Check against rangeEnd if needed
//     if (category.rangeEnd && nextNumber > category.rangeEnd) {
//       return res.status(400).json({ message: "Document number range exceeded for this category." });
//     }

//     // Create docnumber using prefix and nextNumber
//     const docnumber = `${category.prefix}-${nextNumber}`;

//     const newIssue = new GoodsIssue({
//       ...data,
//       docnumber
//     });

//     await newIssue.save();
//     res.status(201).json({ message: "Goods issue created", docnumber });
//   } catch (err) {
//     console.error("Error saving goods issue:", err);
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// };

// // GET /api/goodsissue
// const getAllGoodsIssues = async (req, res) => {
//   try {
//     const issues = await GoodsIssue.find().sort({ createdAt: -1 });
//     res.json(issues);
//   } catch (err) {
//     console.error("Error fetching goods issues:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = {
//   createGoodsIssue,
//   getAllGoodsIssues
// };

const GoodsIssue = require('../models/GoodsIssue');
const GoodsIssueCategory = require('../models/GoodsIssueCategory'); // ensure this model exists

// POST /api/goodsissue
const createGoodsIssue = async (req, res) => {
  try {
    const data = req.body;

    // Validate category name
    if (!data.category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Fetch category info from DB
    const category = await GoodsIssueCategory.findOne({ categoryName: data.category });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Count goods issues already created with this category
    const issueCount = await GoodsIssue.countDocuments({ category: data.category });
    const nextNumber = category.rangeStart + issueCount;

    // Optional: Check against rangeEnd if needed
    if (category.rangeEnd && nextNumber > category.rangeEnd) {
      return res.status(400).json({ message: "Document number range exceeded for this category." });
    }

    // Create docnumber using prefix and nextNumber
    const docnumber = `${category.prefix}-${nextNumber}`;

    const newIssue = new GoodsIssue({
      ...data,
      docnumber
    });

    await newIssue.save();
    res.status(201).json({ message: "Goods issue created", docnumber });
  } catch (err) {
    console.error("Error saving goods issue:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// GET /api/goodsissue
const getAllGoodsIssues = async (req, res) => {
  try {
    const issues = await GoodsIssue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("Error fetching goods issues:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // GET /api/goodsissue/:docnumber
// const getGoodsIssueByDocNumber = async (req, res) => {
//   try {
//     const { docnumber } = req.params;
//     const issue = await GoodsIssue.findOne({ docnumber });

//     if (!issue) {
//       return res.status(404).json({ message: "Goods Issue not found" });
//     }

//     res.json(issue);
//   } catch (err) {
//     console.error("Error fetching Goods Issue:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// ✅ Final Export
module.exports = {
  createGoodsIssue,
  getAllGoodsIssues,
  // getGoodsIssueByDocNumber
};
