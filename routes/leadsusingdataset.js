const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'leads_dataset.json');
const leadsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

router.post('/get-leads', (req, res) => {
  try {
    const { location, niche } = req.body;

    if (!location || !niche) {
      return res.status(400).json({
        error: "location and niche are required",
      });
    }

    const filteredLeads = leadsData.filter(lead =>
      lead.location.toLowerCase().includes(location.toLowerCase()) &&
      lead.niche.toLowerCase().includes(niche.toLowerCase())
    );

    res.json({
      count: filteredLeads.length,
      leads: filteredLeads,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;