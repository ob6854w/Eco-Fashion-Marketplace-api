// import seed data files, arrays of objects
const brandsData = require('../seed-data/brands');
const productsnewData = require('../seed-data/products');
const usersData = require('../seed-data/users');
const reviewsData = require('../seed-data/reviews');
const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
  // Hashes the passwords of the users
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  // Deletes ALL existing entries
  await knex('brands').del();
  await knex('products').del();
  await knex('users').del();
  await knex('reviews').del();

  // Inserts seed entries 
  await knex('brands').insert(brandsData);
  await knex('products').insert(productsnewData); 
  await knex("users").insert(usersData);
  await knex('reviews').insert(reviewsData);
};
