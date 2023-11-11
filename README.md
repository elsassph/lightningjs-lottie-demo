# Lottie Demo

## com.domain.app.LottieDemo

This LightningJS v2 project, based on the default template, implements a `LottieViewer` component.

Animation is imported as JSON data:

```javascript
import LottieViewer from './LottieViewer'
import lottieAnimData from './LottieAnim.json'
```

`LottieViewer` can then be used in component templates:

```javascript
LottieAnim: {
  type: LottieViewer,
  // start playback automatically (default true)
  autoPlay: true,
  // loop animation (default true)
  loop: true,
  // rendered size (default original animation size)
  width: 200,
  height: 200,
  // Lottie JSON data (set last)
  animationData: lottieAnimData,
},
```

### Controls:

With a reference to the component (e.g. `this.tag('LottieAnim')`), the following API is provided (and could be easily extended):

- `anim.isLoaded`
- `anim.isPaused`
- `anim.play()`
- `anim.pause()`

In this demo project, Enter key should toggle the animation (pause/play).

### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.

## License

ISC License

Copyright 2023 Philippe Elsass

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
