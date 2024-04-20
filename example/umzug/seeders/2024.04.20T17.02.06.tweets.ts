import type { Seeder } from '../umzug';
import { tweets } from './helpers/tweets';

export const up: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  for (const tweet of tweets) {
    await queryBuilder.insert().into('tweets').values(tweet).execute();
  }

  await orm.destroy();
};
export const down: Seeder = async ({ context: orm }) => {
  await orm.initialize();
  const queryBuilder = orm.createQueryBuilder();

  await queryBuilder.delete().from('tweets').execute();
  await orm.query('ALTER SEQUENCE tweets_id_seq RESTART WITH 1;');

  await orm.destroy();
};
