# ACM-NCSU-Node-QuickStart

Here's the basic agenda

## Intro

1.) Install Node and npm

2.) Explain package.json
    - Run `npm init`

3.) Clone project
    - `git clone git@github.com:ACM-NCSU/ACM-NCSU-Node-QuickStart.git`
    - `npm install`
    - Explain `node_modules`, `-g, --save, --save-dev`

4.) Basic node skeleton
    - Walk through project structure

## Web App

Explain routing and Pug:
   
 - Start with defining the layout for the Order view `views/order.pug`
 - Then, make the page for the resulting order `views/order_submitted.pug`
 - Then, add a route in `routes/index.js` for `POST`ing and `GET`ing an order
 - Demo the _somewhat_ working app, highlight the bug (pick only 1 topping)
 - Finally, fix the `POST` route so that a single choice for topping gives an array

## Electron App

Wade, it's all in your hands now.
