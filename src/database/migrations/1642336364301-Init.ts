import {MigrationInterface, QueryRunner} from 'typeorm';

export class Init1642336364301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users(
               id       uuid default uuid_generate_v4() NOT NULL PRIMARY KEY,
               name     varchar(255),
               login    varchar(255),
               password varchar(255)
             );`
        );

        await queryRunner.query(`CREATE TABLE boards(
                id      uuid default uuid_generate_v4() NOT NULL PRIMARY KEY,
                title   varchar(255)
             );`
        );

        await queryRunner.query(`CREATE TABLE columns(
                 id      uuid default uuid_generate_v4() NOT NULL  PRIMARY KEY,
                 title   varchar(255),
                 "order" integer,
                 "boardId"   uuid
             );`
        );

        await queryRunner.query('ALTER TABLE columns ADD CONSTRAINT fk_column_board FOREIGN KEY ("boardId") REFERENCES boards(id) ON DELETE CASCADE;');

        await queryRunner.query(`CREATE TABLE tasks(
               id          uuid default uuid_generate_v4() NOT NULL PRIMARY KEY,
               title       varchar(255),
               "order"     integer,
               description varchar(255),
               "userId"    uuid,
               "boardId"   uuid,
               "columnId"  uuid
             );`
        );

        await queryRunner.query('ALTER TABLE tasks ADD CONSTRAINT fk_task_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE SET NULL;');
        await queryRunner.query('ALTER TABLE tasks ADD CONSTRAINT fk_task_board FOREIGN KEY ("boardId") REFERENCES boards(id) ON DELETE CASCADE;');
        await queryRunner.query('ALTER TABLE tasks ADD CONSTRAINT fk_task_column FOREIGN KEY ("columnId") REFERENCES columns(id) ON DELETE SET NULL;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS users CASCADE ');
        await queryRunner.query('DROP TABLE IF EXISTS boards CASCADE ');
        await queryRunner.query('DROP TABLE IF EXISTS "columns" CASCADE ');
        await queryRunner.query('DROP TABLE IF EXISTS tasks CASCADE ');
    }

}
