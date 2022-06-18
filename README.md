Boilerplate template repo for generic websites that are aimed to display blockchain data in some form or another.

Probably biased clean-code standards are applied.

## Getting Started

The obvious stuff
```shell
yarn
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser and enjoy.

## The stack

Nextjs + Redux-toolkit + tailwind + scss + SWR

- Nextjs because it's React on steroids for production readiness.
- Redux-toolkit because it's Redux on steroids for ease of use & standardization
- Tailwind + scss because it's css on steroids for developers that hate css
- SWR because it's data fetching on steroids for effective presets for RESTFUL apis

## TODO

- CosmJS specifics
- Add React-toolkit, swr, cosmjs.
- Add eslint with its specifics
- Probably add some example code to help kickstart connecting to nodes and showing data in a clean way
- Responsive design?

For data streaming SSE or Websockets because it's all we have. Probably.

Treeshaken RxJS is recommended for reactive programming


## Deploying

Use Vercel or netlify. Shouldn't need any more than that