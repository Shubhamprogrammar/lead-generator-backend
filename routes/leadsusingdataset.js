const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/get-leads', async (req,res)=>{
    try {
    const { location, niche } = req.body;

    if (!location || !niche) {
      return res.status(400).json({
        error: "location and niche are required",
      });
    }

    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: `${niche} in ${location}`,
          key: process.env.GOOGLE_PLACES_API_KEY,
        },
      }
    );

    console.log("Google API Status:", response.data.status); // Add this
    console.log("Results count:", response.data.results.length);

    const leads = response.data.results.map((place) => ({
      name: place.name || "",
      address: place.formatted_address || "",
      rating: place.rating || null,
      totalRatings: place.user_ratings_total || 0,
    }));
    res.json({
      count: leads.length,
      leads,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
})

module.exports = router;