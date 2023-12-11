# The Lonely Lands

A collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker).

Built on Nextjs using Typescript. Custom user frontend with Mantine admin dashboard. Connected to SQLite database with Prismajs and Apollo Graphql.

![](https://img.shields.io/github/actions/workflow/status/blekmus/next-thelonelylands/deploy.yml?style=for-the-badge&logo=github&logoColor=white)

![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/mantine-1a83ce?style=for-the-badge&logo=mantine&logoColor=white)
![](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![](https://img.shields.io/badge/apollo%20graphql-311C87?style=for-the-badge&logo=apollo%20graphql&logoColor=white)

## Previews

![image](https://user-images.githubusercontent.com/47277246/228015669-39c74b1c-e2df-4333-a63c-d0e17d94ab38.png)

### Admin Dashboard

![image](https://user-images.githubusercontent.com/47277246/228016077-785496a6-fb87-4079-b9c0-c2d8c56d8666.png)

![image](https://user-images.githubusercontent.com/47277246/228018189-05f63454-8e6b-458c-874f-caca322f85f0.png)

## Setting up

``` bash
npm install
npx prisma generate
npx prisma migrate dev --name init

# Copy entries file to prisma folder
npm run seed
```
