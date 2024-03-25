// import seed data files, arrays of objects
const brandsData = require('../seed-data/brands');
const productsnewData = require('../seed-data/products');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('brands').del();
  await knex('products').del();
  await knex('brands').insert(brandsData);
  await knex('products').insert(productsnewData); 
};
