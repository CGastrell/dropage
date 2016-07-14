# dropage
Single minimal page served with express to test react components. In this case, a page with an implementation of
a custom Dropzone'd (via [react-dropzone](https://github.com/okonet/react-dropzone)) element for a simple and **not secure** file upload.

## Context
I'm really enjoying playing around with [heatpack](https://github.com/insin/react-heatpack) for my first steps into
[React components](https://facebook.github.io/react/docs/tutorial.html). Newbiely (and saddly), once the
component was in a *usable* stage, I didn't know how to put it on a simple web page.

## Objecive
Having obtained a way to [*compile* a minimal bundle file from a little sample
heatpack project](https://github.com/cgastrell/dropuploader "Dropuploader Component"), serve a
simple page with the bundle and a little snippet to render the component on that page.

## Result
This repo holds a **really** simple express app which:
  * Serves a skeletal hardcoded page (see HTML below) on the root `/`
  * Serves a *compiled* `bundle.js` at `/bundle.js`
  * The hardcoded page has a `<script type="text/babel" />` where you should render/initialize your component

That's it. It's just a proof of concept, nothing fancy. It could evolve though to some kind of test/playground middleware
or just remain as an example.

## HTML
The served page is hardcoded in the index.js:
```javascript
app.get('/', function(req, res){
  res.send(`
    <head>
      <script src="https://fb.me/react-15.2.1.min.js"></script>
      <script src="https://fb.me/react-dom-15.2.1.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    </head>
    <body>
      <div id="app"></div>
      <script src="bundle.js"></script>
      <script type="text/babel">
        ReactDOM.render(
          <Dropage uploadUrl="http://localhost:3002/uploader" />,
          document.getElementById('app')
        );
      </script>
    </body>
  `);
});
```
Horrible, I know. See the section with the `<Dropage />` component? Well, this was taken from my own [test project
(serve a page with only a Dropzone'd element)](https://github.com/cgastrell/dropuploader "Dropuploader Component")

The hard part was mainly to dig about the correct webpack config. See it in the mentioned Dropuploader repo
