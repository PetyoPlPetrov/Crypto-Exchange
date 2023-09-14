## Start the app

To start the development server run `npm install && npm start`. 

Entry point for the project: apps/app
The app has a debounced input setting with default 2s interval. When typing the old dataset is getting greyed out. A sorting icon wil get enabled once we have data

## Project structure

```
The application consists of 2 apps (main app and storybook) and 
4 modules (1 library for reusable components/a tiny design system and 3 encapsuled modules)
packaged separately using NX manager. The app has an external config with inversion of 
control via the DataProvder and useGetData fn (and custom hocs).
PS - some websites are not well suited for crawling via UI and cors errors occasionally
happens which prevent the proper error handling.

.github/actions/version-bump - my custom script for app version bump
- apps
    app - the main application consumer
      - ./app/src/app/apiConfigs = the config files for extending the crawl functionality 
      - ./app/src/app/app.tsx - main entry point for the app
    app-e2e - place for e2e tests
    storybook - with a small setup for custom tabs
  -libs
      -components - independant reusable across all modules componentss
        - components
            -atoms
            -molecules
          -helpers
      - search-bar - the capsulated app search bar  
        - components - custom for this module components
        - utils - custom internal utils  
      - search-layout
        -  ./lib/components - custom for this module components
        -  ./lib/helpers - custom for this module helper fns
        -  ./lib/hocs - custom for this module hocs fns
      - services - the core functionality for fetching data allowing external config and decoupling
        - ./lib/dataLoaders -  the core fn useGetData
        - ./lib/helpers


```