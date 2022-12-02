"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../../database/connect");
const main_models_1 = __importDefault(require("../main.models"));
const mainAction = new main_models_1.default();
class partitionsModel {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = data.link === null ? null : `'${data.link}'`;
            try {
                const rows = (yield (0, connect_1.query)(`INSERT INTO partitions (name, img, link, status)
        VALUES ('${data.name}', '${data.img}', ${link}, '${data.status}');`));
                const relations = yield this.insertRelation(data.relations, rows.insertId);
                relations.insertId = rows.insertId;
                return relations;
            }
            catch (err) {
                throw new Error(`unable to add this partition : ${err.message}`);
            }
        });
    }
    getAll(to) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = to === "admin" ? "" : "WHERE `status`=1";
            try {
                const rows = (yield (0, connect_1.query)(`SELECT * FROM partitions ${type};`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to get partitions : ${err.message}`);
            }
        });
    }
    getPartition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT id, name, link, img, status FROM partitions WHERE \`status\`=1 AND id=${id};`));
                if (rows[0].link === null || rows[0].link === "null") {
                    const relation = (yield (0, connect_1.query)(`SELECT menu_forks.name AS name, menu_forks.id AS id FROM menu_forks
           JOIN partitions_connect ON menu_forks.id = partitions_connect.fork_id
           AND partitions_connect.partition_id=${rows[0].id};`));
                    const partition_info = {
                        id: rows[0].id,
                        img: rows[0].img,
                        name: rows[0].name,
                        link: rows[0].link,
                        status: rows[0].status,
                        relations: relation,
                    };
                    return partition_info;
                }
                else {
                    return rows[0];
                }
            }
            catch (err) {
                throw new Error(`unable to get this partition : ${err.message}`);
            }
        });
    }
    updateInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`UPDATE  partitions SET name='${data.name}', status='${data.status}',
        img='${data.img}', link='${data.link}',
         updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`));
                yield this.deleteRelation(data.id);
                yield this.insertRelation(data.relations, data.id);
                return rows;
            }
            catch (err) {
                throw new Error(`unable to change info of this item : ${err.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const relation = yield this.deleteRelation(id);
                const rows = yield mainAction.delete(id, "partitions");
                rows.affectedRows = rows.affectedRows + relation.affectedRows;
                return rows;
            }
            catch (err) {
                throw new Error(`unable to delete partitions : ${err.message}`);
            }
        });
    }
    deleteRelation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`DELETE FROM partitions_connect
        WHERE partition_id= ${id};`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to delete relations : ${err.message}`);
            }
        });
    }
    insertRelation(relations, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const relation = relations.length > 0
                    ? `INSERT INTO partitions_connect VALUES ${this.writeRelation(relations, id)}`
                    : "";
                const result = (yield (0, connect_1.query)(`${relation}`));
                return result;
            }
            catch (err) {
                throw new Error(`unable to insert relations : ${err.message}`);
            }
        });
    }
    writeRelation(relation, id) {
        let query = "";
        for (let i = 0; i < relation.length; i++) {
            if (i === relation.length - 1) {
                query += `(${id}, ${relation[i].id});`;
            }
            else {
                query += `(${id}, ${relation[i].id}),`;
            }
        }
        return query;
    }
}
exports.default = partitionsModel;
