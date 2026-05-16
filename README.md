# The Lonely Lands

A collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker).

Built as a static Next.js site using TypeScript, Markdown articles, Emotion, Mantine, and Apollo GraphQL for the client-side AniList page.

![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/mantine-1a83ce?style=for-the-badge&logo=mantine&logoColor=white)
![](https://img.shields.io/badge/apollo%20graphql-311C87?style=for-the-badge&logo=apollo%20graphql&logoColor=white)

## Previews

![image](https://user-images.githubusercontent.com/47277246/228015669-39c74b1c-e2df-4333-a63c-d0e17d94ab38.png)

### Admin Dashboard

![image](https://user-images.githubusercontent.com/47277246/228016077-785496a6-fb87-4079-b9c0-c2d8c56d8666.png)

![image](https://user-images.githubusercontent.com/47277246/228018189-05f63454-8e6b-458c-874f-caca322f85f0.png)

## Setting up

``` bash
npm install
npm run dev
```

## Content

Writer and Cinephile articles live in `content/articles/*.md`. The filename becomes the post slug under `/post`.

``` markdown
---
title: "Article title"
type: "essay"
publishedAt: "2026-05-15"
cover: "/images/home-banner.jpg"
draft: false
---

Article body goes here.
```
