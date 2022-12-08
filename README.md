## Reclone (clone of reddit, [sort of])

[Live demo](reclone.vercel.app)

It has main functionality of reddit, except for design.
You can:
- Create account
- Create communities
- Subscribe to communities
- Create posts
- Vote on posts
- Vote on comments
- Comment on posts

Other functionalities include
- Searching and autocomplition of communities
- Seperated main and feed tabs (feed is posts from communities you are subscribed to)

I like this project and will provide new features/fix bugs as they appear in future.

### ⚙ Main technologies i used:
Frontend
- Next.js
- GraphQL
- react-query
- tailwindcss
- zustand
- react-hook-form
- react-quill

Backend
- Nestjs
- TypeORM
- PostgreSQL
- GraphQL

### ⛑ Contribution
I've been developing it alone, but open-source experience would be cool as well, so if you want to contribute feel free to.

Clone [frontend](https://github.com/serzhan181/reclone) repo <br>
Clone [backend](https://github.com/serzhan181/reclone-backend) repo

Installing frontend repo is pretty straightforward -> yarn install and you should be good
To installing backend repo you have to:
- Create database in your postgresql and name it *reclone_db*
- Run migrations ```yarn typeorm migration:run -d typeOrm.config.ts```
- Start dev server

Remember, you have to run backend **first**, before running backend.

