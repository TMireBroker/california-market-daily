// Simple daily generator: pick 6 headlines from a pool
const fs = require('fs');
const dayjs = require('dayjs');

const pool = JSON.parse(fs.readFileSync('data/pulse_pool.json','utf8'));

// Shuffle helper
function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

if (!Array.isArray(pool) || pool.length < 6) {
  console.error('Need at least 6 items in data/pulse_pool.json');
  process.exit(1);
}

// Pick 6 and write pulse.json
const picks = shuffle([...pool]).slice(0, 6).map(item => ({
  city: item.city,
  text: item.text
}));

const out = JSON.stringify(picks, null, 2);
fs.writeFileSync('pulse.json', out, 'utf8');

console.log(`Wrote pulse.json for ${dayjs().format('YYYY-MM-DD')}`);
