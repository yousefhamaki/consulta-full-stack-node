import { query } from "../../database/connect";
import InsertType from "../../types/general.type";
import Partition from "../../types/partition.type";
import Accepted from "../../types/accepted.type";
import MainModel from "../main.models";

const mainAction = new MainModel();

class partitionsModel {
  async create(data: Partition): Promise<InsertType> {
    const link = data.link === null ? null : `'${data.link}'`;

    try {
      const rows = (await query(
        `INSERT INTO partitions (name, img, link, status)
        VALUES ('${data.name}', '${data.img}', ${link}, '${data.status}');`
      )) as InsertType;

      const relations = await this.insertRelation(
        data.relations,
        rows.insertId
      );

      relations.insertId = rows.insertId;

      return relations;
    } catch (err) {
      throw new Error(
        `unable to add this partition : ${(err as Error).message}`
      );
    }
  }

  async getAll(to: string): Promise<Partition[]> {
    const type = to === "admin" ? "" : "WHERE `status`=1";
    try {
      const rows = (await query(
        `SELECT * FROM partitions ${type};`
      )) as Partition[];

      return rows;
    } catch (err) {
      throw new Error(`unable to get partitions : ${(err as Error).message}`);
    }
  }

  async getPartition(id: number): Promise<Partition> {
    try {
      const rows = (await query(
        `SELECT id, name, link, img, status FROM partitions WHERE \`status\`=1 AND id=${id};`
      )) as Partition[];

      if (rows[0].link === null || rows[0].link === "null") {
        const relation = (await query(
          `SELECT menu_forks.name AS name, menu_forks.id AS id FROM menu_forks
           JOIN partitions_connect ON menu_forks.id = partitions_connect.fork_id
           AND partitions_connect.partition_id=${rows[0].id};`
        )) as { id: number }[];

        const partition_info = {
          id: rows[0].id as number,
          img: rows[0].img,
          name: rows[0].name,
          link: rows[0].link,
          status: rows[0].status,
          relations: relation,
        } as Partition;

        return partition_info;
      } else {
        return rows[0];
      }
    } catch (err) {
      throw new Error(
        `unable to get this partition : ${(err as Error).message}`
      );
    }
  }

  async updateInfo(data: Partition): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  partitions SET name='${data.name}', status='${data.status}',
        img='${data.img}', link='${data.link}',
         updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`
      )) as Accepted;

      await this.deleteRelation(data.id as number);

      await this.insertRelation(data.relations, data.id as number);

      return rows;
    } catch (err) {
      throw new Error(
        `unable to change info of this item : ${(err as Error).message}`
      );
    }
  }

  async delete(id: number): Promise<Accepted> {
    try {
      const relation = await this.deleteRelation(id);

      const rows = await mainAction.delete(id, "partitions");

      rows.affectedRows = rows.affectedRows + relation.affectedRows;

      return rows;
    } catch (err) {
      throw new Error(
        `unable to delete partitions : ${(err as Error).message}`
      );
    }
  }

  async deleteRelation(id: number): Promise<Accepted> {
    try {
      const rows = (await query(
        `DELETE FROM partitions_connect
        WHERE partition_id= ${id};`
      )) as Accepted;

      return rows;
    } catch (err) {
      throw new Error(`unable to delete relations : ${(err as Error).message}`);
    }
  }

  async insertRelation(
    relations: { id: number }[],
    id: number
  ): Promise<InsertType> {
    try {
      const relation =
        relations.length > 0
          ? `INSERT INTO partitions_connect VALUES ${this.writeRelation(
              relations,
              id
            )}`
          : "";

      const result = (await query(`${relation}`)) as InsertType;

      return result;
    } catch (err) {
      throw new Error(`unable to insert relations : ${(err as Error).message}`);
    }
  }

  private writeRelation(relation: { id: number }[], id: number): string {
    let query = "";

    for (let i = 0; i < relation.length; i++) {
      if (i === relation.length - 1) {
        query += `(${id}, ${relation[i].id});`;
      } else {
        query += `(${id}, ${relation[i].id}),`;
      }
    }
    return query;
  }
}

export default partitionsModel;
