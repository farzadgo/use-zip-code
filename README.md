# useZipCode demo app

This is an small app that checks for available zip/postal codes ins some European countries plus US and India. It is develeped and build with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Axios](https://axios-http.com/) HTTP client for fetching data and possible cachings.

This demo app is based on **Zip·po·pot·amus /ˈzipōpätəməs/** (https://api.zippopotam.us/) free API which provides the zip codes and locatoion data.

The zip code input filed checks for the correct input format as well as correct input lengths associated with the selected country.

> TODO:
> - save any result to local storage and render their list in a seperate route
> - detailed pages for searched results with an interactive map and marker[s]
> - search possible locations (cities) and associated zip code information