exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();
  
  //Se eu deletar a nota que essa tag está vinculada, então a tag será deletada
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  //Não da para criar uma tag sem ter um usuário ou nota
  table.integer("user_id").references("id").inTable("users");

});

exports.down = knex => knex.schema.dropTable("tags");
