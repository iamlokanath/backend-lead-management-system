const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

// GET /api/leads (with filters and pagination)
router.get("/", async (req, res) => {
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
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { leadId: search },
      { objectId: search },
    ];
  }

  const leads = await Lead.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Lead.countDocuments(filter);
  res.json({ leads, total });
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
