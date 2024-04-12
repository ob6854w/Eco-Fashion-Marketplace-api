// import seed data files, arrays of objects
const brandsData = require('../seed-data/brands');
const { cleanupProducts } = require('../seed-data/products');
const { cleanupReviews } = require("../seed-data/reviews");
const usersData = require('../seed-data/users');
const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
  // Hashes the passwords of the users
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  const products = await cleanupProducts();
  const reviewsData = await cleanupReviews();

  // Deletes ALL existing entries
  await knex('brands').del();
  await knex('products').del();
  await knex('users').del();
  await knex('reviews').del();

  // Inserts seed entries 
  await knex('brands').insert(brandsData);
  await knex("products").insert(products); 
  await knex("users").insert(usersData);
  await knex('reviews').insert(reviewsData);
};
