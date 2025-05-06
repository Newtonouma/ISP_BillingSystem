const cron = require('node-cron');
const Invoice = require('./models/Invoice');
const Customer = require('./models/Customer');
const Plan = require('./models/Plan');

cron.schedule('0 0 1 * *', async () => {
  const customers = await Customer.find({ status: 'active' }).populate('planId');
  for (const c of customers) {
    await Invoice.create({
      customerId: c._id,
      amount: c.planId.price,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      status: 'pending'
    });
    console.log(`Invoice generated for ${c.name}`);
  }
});
