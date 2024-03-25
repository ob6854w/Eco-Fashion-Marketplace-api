// import seed data files, arrays of objects
const brandsData = require('../seed-data/brands');
const productsnewData = require('../seed-data/products');
const usersData = require('../seed-data/users');
const reviewsData = require('../seed-data/reviews');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('brands').del();
  await knex('products').del();
  await knex('users').del();
  await knex('reviews').del();
  await knex('brands').insert(brandsData);
  await knex('products').insert(productsnewData); 
  await knex('users').insert(usersData);
  await knex('reviews').insert(reviewsData);
};
