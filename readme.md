# TypeORMStorage for Umzug

- Use `Umzug` and `TypeORM` for database migrations using `TypeORMStorage`, instead of `SequelizeStorage`.
- Heavily inspired by [SequelizeStorage](https://github.com/sequelize/umzug/blob/main/src/storage/sequelize.ts), I mostly mirrored it to `TypeORM` (with less features 😬).

# How to use?

- This snippet is from the [example](https://github.com/G0maa/typeorm-storage-umzug/blob/main/example/umzug/umzug.ts).

1. Install dependencies using `yarn add typeorm-storage-umzug` or `npm install typeorm-storage-umzug`.

```js
import { Umzug } from 'umzug';
import { TypeORMStorage } from 'typeorm-storage-umzug';
import { DataSource } from 'typeorm';

const orm = new DataSource({
  type: 'postgres',
  /* remaining DataSource options ... */
});


export const migrator = new Umzug({
  /* ... remaining Umzug options ... */
  context: orm,
  storage: new TypeORMStorage({
    dataSource: orm,
    tableName: 'migrator_meta',
  }),
});
export type Migration = typeof migrator._types.migration;
```

# TODOs

1. get rid of many `.initalize` `.destroy`.
2. make package not depend on `TypeORM` or `Umzug`.
3. revise `.tsconfig` I copied the one at `nestjs`.
