<div align="center">
    <a href="https://github.com/mbb10324/react-onus/">
        <img src="https://raw.githubusercontent.com/mbb10324/react-onus/main/docs/logo.png" alt="react-figura" width="50%" />
    </a>
</div>
<br />
<div align="center">
<img src="https://img.shields.io/badge/npm-v1.0.5-violet?style=for-the-badge" alt="badge"/>
<img src="https://img.shields.io/badge/gzip_size-9.4kB-orange?style=for-the-badge" alt="badge"/>
<img src="https://img.shields.io/badge/license-Apache_2.0-blue?style=for-the-badge" alt="badge"/>
<img src="https://img.shields.io/badge/coverage-100%25-green?style=for-the-badge" alt="badge"/>
</div>
<br />

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
- `error` (optional): Specify a custom error component to show if an error occurs. Without this prop, react-onus displays a default error message.
- `handleLoading` (optional, default=true): Set this to false if you want react-onus to bypass showing a loader, this will simply return its children. You can use this in conjunction with onLoaded to handle your own loading state
- `handleErrors` (optional, default=false): Set this to true if you want react-onus to handle asset loading errors. By default, this is set to false. If an asset fails during the preload process and handleErrors is false, the spinner will disappear once the preload result is received.
- `onLoaded` (optional): A callback function that is called when all assets have loaded successfully. ex:

```
<Onus assets={someAssets} onLoaded={() => console.log("All assets have been loaded!")}>
    {/* children */}
</Onus>
```

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

react-onus is an open-source library, and we welcome contributions from the developer community. If you're interested in contributing, we recommend following these steps located within the `/docs` folder to get started:

1. Read the **code-of-conduct.md**: Before contributing, please familiarize yourself with our Code of Conduct, which outlines the expected behavior and guidelines for interaction within the Figura community.

2. Review the **contributing.md**: Take some time to read our contribution guidelines, which provide helpful information and best practices for contributing code, reporting issues, and proposing new features.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for details.

## Github

[https://github.com/mbb10324/react-onus](https://github.com/mbb10324/react-onus "react-onus")
