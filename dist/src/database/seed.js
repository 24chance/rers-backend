"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = require("../config/db");
const models_1 = require("./models");
const user_role_enum_1 = require("../common/enums/user-role.enum");
async function seed() {
    await db_1.AppDataSource.initialize();
    const roleRepo = db_1.AppDataSource.getRepository(models_1.Role);
    for (const roleName of Object.values(user_role_enum_1.UserRole)) {
        const exists = await roleRepo.findOne({ where: { name: roleName } });
        if (!exists) {
            await roleRepo.save(roleRepo.create({ name: roleName }));
            console.log(`Created role: ${roleName}`);
        }
        else {
            console.log(`Role already exists: ${roleName}`);
        }
    }
    await db_1.AppDataSource.destroy();
    console.log('Seeding complete.');
}
seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map