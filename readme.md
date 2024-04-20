# TypeORMStorage for Umzug

- Use `Umzug` and `TypeORM` for database migrations using `TypeORMStorage`, instead of `SequelizeStorage`.
- Heavily inspired by [SequelizeStorage](https://github.com/sequelize/umzug/blob/main/src/storage/sequelize.ts), I mostly mirrored it to `TypeORM`.

# How to use?

1. TODO.

# TODOs

1. lint & format. Add `eslint`?
2. commitlint. (husky)
3. revise `.tsconfig` I copied the one at `nestjs`.
4. make package not depend on `TypeORM` or `Umzug`.
5. get rid of many `.initalize` `.destroy`.
