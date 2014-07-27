
Issue:

IronRouter incorrectly changes the current layout, yields, templates and data if:

  * the route includes a subscription, either in `waitOn` or `onBeforeAction`
  * the `onBeforeAction` does `if(!this.ready()) pause()`

Test:

1. Go to https://localhost:3000, should see an `ul` with 4 anchors
 each route has a built in "10sec" delay from a dummy subscription handle.

2. Click on any anchor and observe the result

Result:

going from `/` to `/content/a/1`, going from `/content/a/1` to `/content/a/2`, going from `/content/a/2` to `/content/b/1`

  * the current route stays open, until the next route is ready to load
