# Performant Search

This sample application shows some techniques to displaying large lists of data and performantly searching the data.

### Virtual Scrolling
DOM operations are expensive, and rendering large lists of items to the DOM will cause slowness. On components that have large lists its a good idea to use virtual scrolling.

In an Angular application you can follow [this guide](https://ionicframework.com/docs/angular/virtual-scroll).

You will notice in our `search.page.html` that `cdk-virtual-scroll-viewport` is used. 

The performance effect is that only the items that are shown on screen are rendered rather than rendering every item to the DOM.

### TrackBy
We use Angular's [TrackBy](https://angular.io/api/core/TrackByFunction) feature in our template: `let region of regions; trackBy: trackByRegions` where `trackByRegions` is a function that returns a unique property from the list (in this case the `uid` property).

The performance effect is that whenever there are changes to the items in our template Angular will only render the items that have changed and not all items.

### Debounce
We use the `ion-searchbar`s feature of `debounce`. The performance effect of a debounce value (in milliseconds) is that instead of searching for items after every keystroke (and causing expensive re-renders), we only re-evaluate the search criteria if the search has changed in a 1000ms interval.

### Loading Spinner
The API that returns the large list of items takes several seconds to return. To let the user know that something is happening during this time we use the `ion-spinner` component.

### API Caching
Most page slowness is caused by the round trip of an API call(s). In our case the list of regions is a slow API call. To counter this caching is employed. There are various caching techniques that you can use, from in-memory to persisted with `sessionStorage` or `localStorage` or a Storage library ([link](https://ionicframework.com/docs/angular/storage)). In this example i've used `localStorage` to demonstrate the performance improvement. In a production app I would implement a more robust and encapsulated solution for caching (like this [code](https://github.com/dtarnawsky/cs-secure-storage-key-value/blob/main/src/app/cache.service.ts)).

The performance effect is that whenever we revisit the search page it is displayed and interactive almost instantly rather than naively calling the API every time.