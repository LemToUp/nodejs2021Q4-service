import {MigrationInterface, QueryRunner} from "typeorm";
import {UserService} from "../../resources/users/user.service";
require('dotenv').config();

export class AddAdminUser1642933983042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userService = new UserService();
        await userService.create('admin', 'admin', 'admin');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userService = new UserService();
        const adminUser = await userService.getByLogin('admin');
        adminUser && adminUser.id && await userService.remove(adminUser.id);
    }

}
