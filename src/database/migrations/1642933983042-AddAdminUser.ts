import {MigrationInterface, QueryRunner} from "typeorm";
import {UserService} from "../../resources/users/user.service";
require('dotenv').config();

export class AddAdminUser1642933983042 implements MigrationInterface {
    constructor(private userService: UserService) {}

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.userService.create('admin', 'admin', 'admin');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const adminUser = await this.userService.getByLogin('admin');
        adminUser && adminUser.id && await this.userService.remove(adminUser.id);
    }

}
