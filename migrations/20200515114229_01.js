
exports.up = function(knex) {
    return knex.schema
  
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.boolean('completed').defaultTo(false);
        tbl.string("name", 128).notNullable();
        tbl.string("description", 128);
    })

    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.integer("project_id")
            .unsigned()
            .notNullable()
            .references('projects.id');
        tbl.string("description", 128).notNullable();
        tbl.string("notes", 128);
        tbl.boolean('completed').defaultTo(false);
    })

    .createTable('resources', tbl => {
        tbl.increments();
        tbl.string("name", 128).notNullable();
        tbl.string("description", 128);
    })
  
    .createTable('projects-resources', tbl => {
        tbl.increments();
        tbl.integer("project_id")
            .unsigned()
            .notNullable()
            .references('projects.id');
        tbl.integer("resource_id")
            .unsigned()
            .notNullable()
            .references('resources.id');
    })
};
  
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("projects-resources")
        .dropTableIfExists("resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("projects")
};
  
