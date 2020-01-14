import sqlite3 from 'sqlite3'
import { join } from 'path'
import notify from './notify'
import os from 'os'
import fs from 'fs'
let dir = join(os.homedir(), './primag')

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}
class DB {
    constructor() {
        const dbPath = join(dir, 'item_price.db')
        if (DB._instance) {
            console.log('new database instance')
        }
        DB._instance = this;
        this.DBCon = new Promise(function (resolve, reject) {
            var db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    reject(err.message)
                }
                else {
                    db.run(`CREATE TABLE IF NOT EXISTS products ( id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        name TEXT NOT NULL UNIQUE, price INTEGER)`,
                        (result, err) => {
                            err ? reject(err.message) : resolve(db)
                        })
                    resolve(db)
                    notify.dbSuccess()
                }
            })
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.DBCon.then((db) => {
                var sql = `SELECT * FROM products`
                db.all(sql, ((err, rows) => {
                    err ? reject(err.message) : resolve(rows)
                }))
            })
        })
    }

    insert(productArray) {
        return new Promise((resolve, reject) => {
            this.DBCon.then((db) => {
                db.serialize(() => {
                    var sql = `Insert INTO products(name,price) Values(?,?)`
                    db.run(sql, productArray, function (err) {
                        err ? reject(err.message) :
                            db.get(`SELECT * FROM products WHERE id = ?`, [this.lastID], function (err, row) {
                                err ? reject(err.message) : resolve(row)
                            })
                    })
                })
            })
        })
    }

    update(productArray, id) {
        return new Promise((resolve, reject) => {
            this.DBCon.then((db) => {
                var sql = `Update products SET name = ?, price = ? WHERE id = ?`
                db.run(sql, [...productArray, id], function (err) {
                    err ? reject(err.message) : resolve(this.changes)
                })
            })
        })
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.DBCon.then((db) => {
                var sql = `SELECT * FROM products WHERE id = ?`
                db.get(sql, [id], (err, row) => err ? reject(err.message) : row ? resolve(row) : reject(`product not found`))
            })
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.DBCon.then((db) => {
                var sql = `DELETE FROM products WHERE id = ?`
                db.run(sql, [id], function (err) {
                    err ? reject(err.message) : resolve(this.changes)
                })
            })
        })
    }

    close() {
        this.DBCon.then((db) => {
            db.close()
        })
    }
}


export default new DB()







