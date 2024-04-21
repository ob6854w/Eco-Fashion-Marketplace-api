/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("brands", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("website_url").notNullable();
      table.string("image_url").notNullable();
      table.string("description").notNullable();
      table.string("location").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    }); 
};
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("brands");
  
};
