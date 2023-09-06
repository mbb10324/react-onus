# react-onus

react-onus is a React component library designed to simplify the process of loading and error handling for assets like images, videos, fonts, and more within your projects. The library offers a simple, effective, and intelligent approach to managing the wait times associated with asset loading. Quickly create a better user experience, and achieve a faster development experience with react-onus.

## Installation

`npm install react-onus`

## Features

- Handle loading of various assets to include images, videos, audio, fonts, and SVGs.
- Handle errors when loading assets
- Easily support custom loading and error components.

## Usage

```
import React from 'react';
import Onus from 'react-onus';

const App = () => {
  const assets = [
    { type: 'image', src: 'path-to-image.jpg' },
    { type: 'font', src: 'font-name' },
  ];

  return (
    <Onus assets={assets} loader={<div>Loading...</div>}>
        <div>
            <h1>Your main App content</h1>
            <img src="path-to-image.jpg" alt="img" />
        </div>
    </Onus>
  );
};

export default App;
```

## Props

- `children`: By default react-onus will render (or show a loader/error in place of) the children within `<Onus></Onus>`
- `assets` (required): An array of objects with type and src properties indicating the assets you want to wait for.
- `loader` (optional): A custom component displayed while assets load. If omitted, react-onus will show its default spinner.
- `handleErrors` (optional): Set this to true if you want react-onus to handle asset loading errors. By default, this is set to false. If an asset fails during the preload process and handleErrors is false, the spinner will disappear once the preload result is received.
- `error` (optional): Specify a custom error component to show if an error occurs. Without this prop, react-onus displays a default error message.

## Assets

The asset prop should always be structured like the example below. ensure your `type` matches the `src`.

ex:

```
const asset = [
    {
        type: "image" | "svg" | "video" | "audio" | "font"
        src: string
    }
]
```

## Fonts

Fonts can be especially tricky when waiting on them to load or checking for errors due to the numerous methods of utilizing/importing/fetching them. The fontfaceobserver library has an elegant solution for this in a really lightweight package. For that reason, this is the only dependecy that react-onus relies on. Regardless of how you use your fonts within your project fontfaceobserver detects the actual webfont so this makes it really effective and efficient to just use the font-family name as the src for our asset.

ex:

```
const asset = [
    {
        type: "font"
        src: "Roboto"
    }
]
```

## Contributing

If you'd like to contribute to react-onus, please read our CONTRIBUTING.md guidelines.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for details.

## Github

[https://github.com/mbb10324/react-onus](https://github.com/mbb10324/react-onus "react-onus")
