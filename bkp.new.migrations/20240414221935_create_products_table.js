/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
     return knex.schema.createTable("products", (table) => {
       table.increments("id").primary();
       table
         .integer("brand_id")
         .unsigned()
         .references("brands.id")
         .onUpdate("CASCADE")
         .onDelete("CASCADE");
       table.string("name").notNullable();
       table.string("description", 1000).notNullable();
       table.string("category").notNullable();
       table.string("material").notNullable();
       table.decimal("price", 10, 2).notNullable();
       table.string("currency").notNullable();
       table.string("image_url").notNullable();
       table.string("colors").notNullable();
       table.string("sizes").notNullable();
       table.timestamp("created_at").defaultTo(knex.fn.now());
     }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("products");
};
