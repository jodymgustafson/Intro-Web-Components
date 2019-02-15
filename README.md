# Into to Web Components

This is the source code for the Intro to Web Components presentation.
It uses Polymer for some of the components so you must install Polymer to run them (see below).

## Sections
1. This is a simple custom element named say-hello that says "Hello, World". It builds a shadow DOM manually.
2. In this example we rewrite the say-hello element to use a template to define the shadow DOM. It also demonstrates how to use properties and attributes.
3. This shows how to handle interaction between multiple components by creating an element that allows the user to enter whom to say hello to and updating the say-hello element.
4. This example shows how to use slots to allow the users of your custom element to insert their own content into the element.
5. In this example we show all of the components rewritten using Polymer, as well as an example of outputing repeating elements.

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing the Examples

```
$ polymer serve
```
Then go to the URL printed in the console.