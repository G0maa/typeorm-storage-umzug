import { Migration } from '../umzug';
import { Table } from 'typeorm';
import { baseColumns } from './helpers/base-attributes';

export const up: Migration = async ({ context: orm }) => {
  await orm.initialize();
  const queryRunner = orm.createQueryRunner();

  await queryRunner.createTable(
    new Table({
      name: 'likes',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'userId',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'tweetId',
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
        {
          columnNames: ['tweetId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'tweets',
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

  await orm.createQueryRunner().dropTable('likes');

  await orm.destroy();
};
