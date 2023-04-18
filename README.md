# Belvo Wallet

This is a simples project to complete the interview test for the Frontend position at Belvo

## How to run this project?

To install dependencies run:

```sh
yarn install
```

Then to run the application

```sh
yarn dev
```

The application will be available at [http://localhost:3000/](http://localhost:3000/). If you don't want to run locally you can check the app at [https://wallet.romulomessias.dev](https://wallet.romulomessias.dev)

## What about tests?

To run the e2e test tou can simply try:

```sh
yarn cypress:e2e
```

or

```sh
yarn cypress:open
```

to see tests running on browser

## The stack behind it

Some og the tech I used in this project

### React

I use react for a quite some time and in my current job, so choose react was natural for me. I feel comfortable building web app with this lib.

### SASS

Nothing special here, another tool I use um my current job. Here i tried to use [BEM](https://getbem.com/introduction/) to organize my stylesheet.

### Material UI

Choose this [lib](https://mui.com/core/) to help me with the base components like button and input. Like this one because it's a react implementation of the Material UI

### Vite

Choose Vite to build this application because of it's fast and simple. I could have used Nextjs, but I thought I could not take advantage of SSG or SSR.

## How is the code organized?

```sh
project
└─── src
    └─── components
    └─── constants
    └─── pages
        └─── components
    └─── services
    └─── styles
```

- src

  Root folder of all my source code, in this folder there is the entry point of the app as well.

- components

  All the global components that can be used in more then one page.

- constants

  All constants that is use across the app

- pages

  All pages that the application have. Each page can have it's own components.

- services

  All external api used across the app.

- styles

  Common global styles and sass variables.
