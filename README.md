
Issue:

IronRouter incorrectly changes the current layout, yields, templates and data if:

  * the route includes a subscription, either in `waitOn` or `onBeforeAction`
  * the `onBeforeAction` does `if(!this.ready()) pause()`

Test:

1. Go to https://localhost:3000, should see an `ul` with 4 anchors
 each route has a built in "10sec" delay from a dummy subscription handle.

2. Click on any anchor and observe the result

Result:

  * sets the layout to the new routes layout
  * none of the yields are rendered

Expected Result:

  * The current route stays open, until `onBeforeAction` (or similar hook) until all hooks complete without a call to `pause()`

