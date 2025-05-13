const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

// GET /api/leads (with filters and pagination)
router.get("/", async (req, res) => {
  try {
    const {
      status,
      type,
      broker,
      subscription,
      search,
      from,
      until,
      page = 1,
      limit = 100,
    } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (broker) filter.broker = broker;
    if (subscription) filter.subscription = subscription;
    if (from || until) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (until) filter.date.$lte = until;
    }
    if (search) {
      const orFilter = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
      const searchNum = Number(search);
      if (!isNaN(searchNum)) {
        orFilter.push({ leadId: searchNum });
        orFilter.push({ objectId: searchNum });
      }
      filter.$or = orFilter;
    }

    const leads = await Lead.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Lead.countDocuments(filter);
    res.json({ leads, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// POST /api/leads
router.post("/", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.status(201).json(lead);
});

// PUT /api/leads/:id
router.put("/:id", async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(lead);
});

// DELETE /api/leads/:id
router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
});

module.exports = router;
