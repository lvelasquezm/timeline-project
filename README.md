## Timeline Visualization Project
I decided to bootstrap my own React app using `create-react-app` which allowed me to use latest and greatest version of React.
Even though the project could have worked with the given scaffolded app, it's always a good practice to start new projects
using lastest tech stack. In my experience, working with and keeping libraries up to date is signal of both: good dev environment
and good practice in terms of tech debt reduction, large codebases always benefit from latest versions of tech stack.

### Running the project
This project uses one of the latests LTS versions of NodeJS, specifically version 20.0.0. 
The preferred method to install NodeJS is to use a Node version manager like [nvm](https://github.com/nvm-sh/nvm)
to avoid collisions with already installed Node versions. You can see the installation instructions
[here](https://github.com/nvm-sh/nvm#installing-and-updating).

1. Install NodeJS (`nvm` will automatically switch to that version after installing it):
```shell
$ nvm install 20.0.0
$ nvm use
```
*Note: If you already have `nvm` installed with that Node version, just run `nvm use`.*

2. Install the node modules and run the dev server:

```shell
$ npm install
$ npm run start
```

3. Go to http://localhost:3000 to see the running project.

4. Running unit tests:
```shell
$ npm run test
```
*Note: Or run a specific test file: `npm run test src/tests/App.test.tsx`.*

### Stack
- React 19
- TypeScript
- Plain CSS (let's not forget how CSS rules work!)
- React testing library with Jest (for unit tests)
- nvm

### Reasoning
- **React:** it's an obvious choice nowadays, it's the most used frontend library for creating UI apps, it's well maintain and its
ecosystem is huge. With the AI boom, most LLMs excel on helping with React specific problems too, which makes it a great choice
for the modern era.
- **TypeScript:** plain JS is OK for quick projects, but TS is a no-brainer for robust code bases that are intended to have
a long lasting life. In this particular project, I'm dealing with objects with specific fields (events have id, name, dates, etc.)
and also dealing with JS date objects, I also created some helper functions and TS gives me confidence that my code runs
how it's supposed to run, without any "black magic" making things work, my code is predictable and safe thanks to TS.
- **Plain CSS:** I could have use Tailwind and will have saved some time perhaps, but I didn't want to add more boilerplate to this
project, would have to define a Tailwind config file just for some little things that I didn't consider necessary for this use case.
I like writing plain CSS from time to time because it keeps my mind fresh on how CSS rules actually works.
- **nvm:** A handy Node version manager that makes projects run smoothly across different computers. It makes handling multiple
NodeJS installations a breeze and makes sure that you, yes you!, runnign this project, don't run into any issue with `node_modules` :)
- **React Testing Library + Jest:** It comes by default in a `create-react-app` so I decided to use this, is pretty simple to setup
component unit tests, it has a very robust API to test component's behavior and rendering and it's fast as well, not too much to
explain here :)

### Why (some decisions were taken)?
1. Folder structure: Even though the codebase isn't huge, I always like to split things up from the very beginning, giving
things single responsabilities, and DRY when possible. I created a `components` folder for each of the pieces that make up
the UI of this project as well as dedicated folders for `styles` (for CSS sheets), `types` (for TS types), `utils`
(for utility functions), and others like `constants` and `data`. Instead of mixing things up, this structure is both
easy to read and follow and scalable in case we'd want to add more modules/features in any point.
2. Wrap components that receive props with `React.memo`: In my experience, specifically in one of my last jobs, memoizing
components doesn't hurt, instead, it saves unnecessary re-renders, specially in dumb components where parent components tends
to change their data based on user interaction. I prefer to use `React.memo` specially for growing codebases where
business logic tends to change from time to time and re-renders are not always easy to track.
3. Using `useMemo` for computations inside components: Similar to the previous point, I like (almost always) to wrap
computed/calculated values in `useMemo` because sometimes is hard to predict (specially in large component trees) where
a child component's props change. You gain more than you loose, maybe you won't gain anything today but will save re-renders
tomorrow when someones else (new joiner likely) changes your codebase without having too much context on how things work.
4. Util functions: I could have created a hook for the lanes logic, I considered it a bit unecessary because the logic wasn't
that complex anyways and it's only used in the `Timeline.tsx` components after all.

### Gotchas
1. For the lanes algorithm, I did use some help from Gemini, specially for the overlapping event dates part. Also,
after having the main logic, I took some advices from Gemini to improve the styling, as well as fixing some weird
behaviors I initially had with CSS grid :) (CSS grid and I always fight).
2. For the main project (timeline visualization with the folder structure mentioned before and styling), I spent
~4.5 hours after my daily activities :)
3. I decided to invests 30 mins more in writing basic unit tests with help of Claude and Gemini :)
4. I didn't invest time in responsiveness, since I already had invested the time allocated for the project.
