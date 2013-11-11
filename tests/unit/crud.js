
document.addEventListener("DOMContentLoaded", function () {
    module('Crud');

    var db,
        tableName = 'table_test';

    test('create, read, update and delete', function () {
        // create database
        var createDatabase = (function () {
            db = new localStorageDB('database_test');

            return db ? true : false;
        })();

        ok(createDatabase, 'create database');

        // create table
        var createTable = (function () {
            if (db.tableExists(tableName)) {
                db.dropTable(tableName);
            }

            db.createTable(tableName, ['col1', 'col2', 'col3']);
            db.commit();

            return db.tableExists(tableName);
        })();

        ok(createTable, 'create table');

        // insert row
        var insertRow = (function () {
            var id = db.insert(tableName, {
                'col1': true,
                'col2': 1,
                'col3': 'test'
            });
            db.commit();

            return id ? true : false;
        })();

        ok(insertRow, 'insert 1 row');

        // get row count
        var getRowCount = (function () {
            return db.rowCount(tableName);
        })();

        equal(getRowCount, 1, 'get row count, should be 1');

        // update row
        var updateRow = (function () {
            return db.update(tableName, {
                    ID: 1
                }, function (row) {
                    return {
                        'col1': false,
                        'col2': 2,
                        'col3': 'edit_test'
                    };
                });
        })();

        equal(updateRow, 1, 'update row');

        // drop table
        var dropTable = (function () {
            db.dropTable(tableName);
            db.commit();

            return db.tableExists(tableName);
        })();

        equal(dropTable, false, 'drop table');
    });
}, false);
