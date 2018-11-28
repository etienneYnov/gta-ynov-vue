"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
        this.createTable2()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY, 
                name text, 
                email text UNIQUE, 
                user_pass text,
                isAdmin integer)`
        return this.db.run(sql);
    }

    createTable2() {
        const sql2 = `
            CREATE TABLE IF NOT EXISTS temps (
                id_temps integer PRIMARY KEY,
                name text, 
                debut_taf_temps date, 
                fin_taf_temps date,
                H_start_temps integer,
                M_start_temps integer,
                H_end_temps integer,
                M_end_temps integer,
                FK_userID integer,
                CONSTRAINT temps_fk_FK_userID FOREIGN KEY (FK_userID)
          REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE)`
        return this.db.run(sql2);
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email],function(err,row){
                callback(err,row)
            })
    }

    selectByName(name, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE name = ?`,
            [name],function(err,row){
                callback(err,row)
            })
    }

    updateTempsPerso(temps) {
        const { id, name, debut_taf_temps, fin_taf_temps, H_start_temps, M_start_temps, H_end_temps, M_end_temps } = temps
        return this.db.get(
        `UPDATE temps SET debut_taf_temps = ?, fin_taf_temps = ?, H_start_temps = ?, M_start_temps = ?, H_end_temps = ?, M_end_temps = ?  WHERE id = ?`,
        [M_end_temps, H_end_temps, M_start_temps, H_start_temps, fin_taf_temps, debut_taf_temps, name, FK_userID, , id],function(err,row){
                callback(err,row)
            })
    y}

    updateUser(user) {
        const { id, name,email,user_pass, isAdmin} = user
        return this.db.get(
        `UPDATE user SET name = ?, email = ?, user_pass = ?, isAdmin = ?   WHERE id = ?`,
        [isAdmin, user_pass, email, name, id],function(err,row){
                callback(err,row)
            })
    y}

    deleteTempsPerso(id_temps) {
        return this.db.get(
        `DELETE FROM temps WHERE id_temps = ?`,
        [id_temps],function(err,row){
                callback(err,row)
            })
    }

    deleteUser(id) {
        return this.db.get(
        `DELETE FROM user WHERE id = ?`,
        [id],function(err,row){
                callback(err,row)
            })
    }

    getUserById(id) {
        return this.db.get(
        `SELECT * FROM user WHERE id = ?`,
        [id],function(err,row){
                callback(err,row)
            })
    }

    getTempsById(id_temps) {
        return this.db.get(
        `SELECT * FROM user WHERE id_temps = ?`,
        [id_temps],function(err,row){
                callback(err,row)
            })
    }

    getTempsByName(name) {
        return this.db.get(
        `SELECT * FROM user WHERE name = ?`,
        [name],function(err,row){
                callback(err,row)
            })
    }

    selectByNameForTime(name, callback) {
        return this.db.get(
            `SELECT * FROM temps WHERE name = ?`,
            [name],function(err,row){
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass,isAdmin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function(err,rows){
            callback(err,rows)
        })
    }

    selectAllTimes(callback) {
        return this.db.all(`SELECT * FROM temps`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    insertTime(temps, callback) {
        return this.db.run(
            'INSERT INTO temps (name, debut_taf_temps, fin_taf_temps, H_start_temps, M_start_temps, H_end_temps, M_end_temps) VALUES (?,?,?,?,?,?,?)',
            temps, (err) => {
                callback(err)
            })
    }

    updateTime(user, callback) {
        return this.db.run(
            'UPDATE temps SET (debut_taf_temps,fin_taf_temps) VALUES (?,?) WHERE user.FK_tempsID = temps.id_temps',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db