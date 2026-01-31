const fs = require("fs");

const niches = ["Dentist", "Gym", "Real Estate", "Restaurant", "Coaching Center", "Salon"];
const locations = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Bangalore", "Chennai", "Lucknow","Varanasi"];

const randomPhone = () =>
  "+91-" + Math.floor(9000000000 + Math.random() * 999999999);

const dataset = [];

for (let i = 1; i <= 5000; i++) {
  const niche = niches[Math.floor(Math.random() * niches.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];

  dataset.push({
    niche,
    location,
    business_name: `${niche} Business ${i}`,
    address: `Area ${i}, ${location}, India`,
    mobile_no: randomPhone(),
    website: `https://www.${niche.toLowerCase().replace(" ", "")}${i}.com`,
  });
}

fs.writeFileSync("leads_dataset.json", JSON.stringify(dataset, null, 2));
console.log("✅ Dataset generated");