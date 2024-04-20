import { TableColumnOptions, TableForeignKeyOptions } from 'typeorm';
export const baseColumns: TableColumnOptions[] = [
  {
    name: 'createdAt',
    type: 'timestamptz', // PostgreSQL specific.
    default: 'CURRENT_TIMESTAMP',
    isNullable: false,
  },
  {
    name: 'updatedAt',
    type: 'timestamptz',
    default: 'CURRENT_TIMESTAMP',
    isNullable: false,
  },
  {
    name: 'deletedAt',
    type: 'timestamptz',
    isNullable: true,
  },
];
