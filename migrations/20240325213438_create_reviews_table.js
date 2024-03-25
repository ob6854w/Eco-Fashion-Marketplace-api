/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("reviews", (table) => {
        table.increments("id").primary();
        table
          .integer("product_id")
          .unsigned()
          .references("products.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("user_id")
          .unsigned()
          .references("users.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("rating").notNullable();
        table.string("comment", 1000).notNullable();
        table.dateTime("created_at").defaultTo(knex.fn.now());
        table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
};
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("reviews"); 
};
