const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/get-leads', async (req, res) => {
  try {
    const { location, niche } = req.body;

    if (!location || !niche) {
      return res.status(400).json({
        error: "location and niche are required",
      });
    }

    const response = await axios.get(
      "https://places-api.foursquare.com/places/search",
      {
        headers: {
          "Accept": "application/json",
          "X-Places-Api-Version": "2025-06-17",
          "Authorization": `Bearer ${process.env.FOURSQUARE_API_KEY}`,
        },
        params: {
          query: niche,
          near: location,
          limit: 10,
        },
      }
    );

    const leads = response.data.results.map((place) => ({
      name: place.name || "",
      address: place.location?.formatted_address || "",
      mobile: place.tel || "",
      website: place.website || "",
      lat: place.geocodes?.main?.latitude || null,
      lng: place.geocodes?.main?.longitude ||  null,
      date_created: place.date_created || null,
    }));

    res.json({
      count: leads.length,
      leads,
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
