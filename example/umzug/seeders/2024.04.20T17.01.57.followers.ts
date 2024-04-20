import type { Seeder } from '../umzug';
import { followers } from './helpers/followers';

export const up: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  for (const follower of followers) {
    await queryBuilder.insert().into('followers').values(follower).execute();
  }

  await orm.destroy();
};
export const down: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  await queryBuilder.delete().from('followers').execute();
  await orm.query('ALTER SEQUENCE followers_id_seq RESTART WITH 1;');

  await orm.destroy();
};
