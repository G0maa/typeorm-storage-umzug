import { Migration } from '../umzug';
import { Table } from 'typeorm';
import { baseColumns } from './helpers/base-attributes';

export const up: Migration = async ({ context: orm }) => {
  await orm.initialize();
  const queryRunner = orm.createQueryRunner();

  await queryRunner.createTable(
    new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        ...baseColumns,
      ],
    }),
    // ifNotExists, should fail if table already exists.
    false,
  );

  await orm.destroy();
};
export const down: Migration = async ({ context: orm }) => {
  await orm.initialize();

  await orm.createQueryRunner().dropTable('users');

  await orm.destroy();
};
