import type { Seeder } from '../umzug';
import { likes } from './helpers/likes';
import { tweets } from './helpers/tweets';

export const up: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  for (const like of likes) {
    await queryBuilder.insert().into('likes').values(like).execute();
  }

  await orm.destroy();
};
export const down: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  await queryBuilder.delete().from('likes').execute();
  await orm.query('ALTER SEQUENCE likes_id_seq RESTART WITH 1;');

  await orm.destroy();
};
