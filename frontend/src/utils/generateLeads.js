// Script to generate 20-30 sample leads via API
import api from "../api/axios";

const statuses = ['new', 'contacted', 'qualified', 'won', 'lost'];
const sources = ['website', 'facebook_ads', 'google_ads', 'referral', 'events', 'other'];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function generateLeads(count = 25) {
  for (let i = 47; i < 150; i++) {
    const lead = {
      first_name: `Test${i+1}`,
      last_name: `User${i+1}`,
      email: `test${i+1}@example.com`,
      phone: `99999${randomInt(10000,99999)}`,
      company: `Company${randomInt(1,10)}`,
      city: 'City' + randomInt(1,10),
      state: 'State' + randomInt(1,5),
      source: randomFrom(sources),
      status: randomFrom(statuses),
      score: randomInt(10,100),
      lead_value: randomInt(1000,100000),
      is_qualified: Math.random() > 0.5,
      last_activity_at: new Date(Date.now() - randomInt(0, 1000000000)).toISOString(),
      created_at: new Date(Date.now() - randomInt(0, 2000000000)).toISOString(),
    };
    try {
      await api.post('/leads', lead);
      console.log('Lead created:', lead.email);
    } catch (err) {
      console.error('Error creating lead:', lead.email, err);
    }
  }
  alert(`${count} leads created!`);
}
