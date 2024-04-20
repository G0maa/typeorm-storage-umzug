import { Migration } from '../umzug';
import { Table } from 'typeorm';
import { baseColumns } from './helpers/base-attributes';

export const up: Migration = async ({ context: orm }) => {
  await orm.initialize();
  const queryRunner = orm.createQueryRunner();

  await queryRunner.createTable(
    new Table({
      name: 'tweets',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'text',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'userId',
          type: 'int',
          isNullable: false,
        },
        ...baseColumns,
      ],
      foreignKeys: [
        {
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }),
    false,
  );

  await orm.destroy();
};
export const down: Migration = async ({ context: orm }) => {
  await orm.initialize();

  await orm.createQueryRunner().dropTable('tweets');

  await orm.destroy();
};
