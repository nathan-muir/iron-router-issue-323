
Issue:

IronRouter incorrectly changes the current layout, yields, templates and data if:

  * the route includes a subscription, either in `waitOn` or `onBeforeAction`
  * the `onBeforeAction` does `if(!this.ready()) pause()`

Test:

1. Go to https://localhost:3000, should see an `ul` with 4 anchors
 each route has a built in "10sec" delay from a dummy subscription handle.

2. Click on any anchor and observe the result

Result:

Going from `/` to `/content/a/1` or similar

  * sets the layout to the new routes layout
  * the `navigation` yield that was present on the previous page are rendered immediately
  * none of the yields are rendered until the dummy subscription completes

Going from `/content/a/1` to `/content/a/2`

  * renders the `contentA1` in the main yield with an empty data context
  * the `navigation` & `layoutAYield` yield that was present on the previous page are rendered immediately

Going from `/content/a/2` to `/content/b/1`

  * sets the layout to layoutB
  * renders the `contentA1` in the main yield with an empty data context
  * the `navigation` yield that was present on the previous page are rendered immediately
  * the `layoutBYield` yield is not rendered until the data is ready

Expected Result:

  * The current route stays open, until `onBeforeAction` (or similar hook) until all hooks complete without a call to `pause()`

