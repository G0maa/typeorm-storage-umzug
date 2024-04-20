import { Table } from 'typeorm';
import type {
  BaseEntity,
  DataSource,
  QueryBuilder,
  QueryRunner,
} from 'typeorm';
import type { UmzugStorage } from 'umzug';

type TypeORMStorageConstructorOptions = {
  /**
   * The configured instance of TypeORM.
   */
  readonly dataSource: DataSource;

  /**
   * The name of the table.
   *
   * @default 'typeorm_meta'
   */
  readonly tableName?: string;

  // Implemented in SequelizeStorage but not in TypeORMStorage:
  // model, modelName, schema, columnName, columnType, timestamps.
};

export class TypeORMStorage implements UmzugStorage {
  public readonly dataSource: DataSource;
  public readonly tableName: string;
  public readonly queryBuilder: QueryBuilder<BaseEntity>;
  public readonly queryRunner: QueryRunner;

  constructor(options: TypeORMStorageConstructorOptions) {
    if (!options.dataSource) {
      throw new Error('TypeORMStorage requires a dataSource');
    }

    this.dataSource = options.dataSource;
    this.tableName = options.tableName ?? 'typeorm_meta';
  }

  async createTableIfNotExists(): Promise<void> {
    // TODO: might move this to a separate method..
    await this.dataSource.initialize();

    await this.dataSource.createQueryRunner().createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
            isUnique: true,
            isGenerated: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true, // ifNotExist
    );

    await this.dataSource.destroy();
  }

  public async logMigration({
    name: migrationName,
  }: {
    name: string;
  }): Promise<void> {
    await this.createTableIfNotExists();

    await this.dataSource.initialize();

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(this.tableName)
      .values({ name: migrationName })
      .execute();

    await this.dataSource.destroy();
  }

  public async unlogMigration({
    name: migrationName,
  }: {
    name: string;
  }): Promise<void> {
    await this.createTableIfNotExists();

    await this.dataSource.initialize();

    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(this.tableName)
      .where({ name: migrationName })
      .execute();

    await this.dataSource.destroy();
  }

  public async executed(): Promise<string[]> {
    await this.createTableIfNotExists();

    await this.dataSource.initialize();

    const migrations = await this.dataSource
      .createQueryBuilder()
      .select('name')
      .from(this.tableName, this.tableName)
      .orderBy('name', 'ASC')
      .getRawMany();

    await this.dataSource.destroy();

    console.log('migrations', migrations);
    // TODO: verify.
    const migrationNames = migrations.map((migration) => migration.name);

    return migrationNames;
  }
}
