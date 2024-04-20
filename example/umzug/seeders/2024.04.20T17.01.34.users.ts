import type { Seeder } from '../umzug';
import { users } from './helpers/users';

export const up: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  for (const user of users) {
    await queryBuilder.insert().into('users').values(user).execute();
  }

  await orm.destroy();
};
export const down: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  await queryBuilder.delete().from('users').execute();
  await orm.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');

  await orm.destroy();
};
