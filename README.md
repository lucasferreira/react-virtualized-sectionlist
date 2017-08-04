# react-virtualized-sectionlist
React SectionList component based in a wrapper around [react-virtualized](https://github.com/bvaughn/react-virtualized) List.

[![npm version](http://img.shields.io/npm/v/react-virtualized-sectionlist.svg?style=flat-square)](https://npmjs.org/package/react-virtualized-sectionlist "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-virtualized-sectionlist.svg?style=flat-square)](https://npmjs.org/package/react-virtualized-sectionlist "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-virtualized-sectionlist.svg?style=flat-square)](https://npmjs.org/package/react-virtualized-sectionlist "View this project on npm")

This component can be usefull to display large sets of grouped data with header line between groups.

### Installation

```bash
npm install react-virtualized-sectionlist --save
```

```bash
yarn add react-virtualized-sectionlist
```

## Example / Usage

This component mimic the same concepts, props and API from [react-virtualized](https://github.com/bvaughn/react-virtualized) List component. If you need [`click here`](https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md) to get more info about.

In order to use this component your *data* need be in this format-schema:

```javascript
const sections = [
  { title: 'Group 1', data: ['Item 1 of Group 1', 'Item 2 of Group 1', 'Item 3 of Group 1', ...] },
  { title: 'Group 2', data: ['Item 1 of Group 2', 'Item 2 of Group 2', 'Item 3 of Group 2', ...] },
  { title: 'Group 3', data: ['Item 1 of Group 3', 'Item 2 of Group 3', 'Item 3 of Group 3', ...] },
  ...
];
```

And to render your the SectionList:

```javascript
import React, { Component } from 'react';
import SectionList from 'react-virtualized-sectionlist';

const renderHeader = ({title, sectionIndex, key, style, isScrolling, isVisible, parent}) => {
  return (
    <div key={key} className="list--header" style={style}>
      <h4>{title}</h4>
    </div>
  );
};

const renderRow = ({item, sectionIndex, rowIndex, key, style, isScrolling, isVisible, parent}) => {
  return (
    <div key={key} className="list--item" style={style}>
      <p>{item}</p>
    </div>
  );
};

const ROW_HEIGHT = 30;

const sections = [
  { title: 'Group 1', data: ['Item 1 of Group 1', 'Item 2 of Group 1', 'Item 3 of Group 1'] },
  { title: 'Group 2', data: ['Item 1 of Group 2', 'Item 2 of Group 2', 'Item 3 of Group 2'] },
  { title: 'Group 3', data: ['Item 1 of Group 3', 'Item 2 of Group 3', 'Item 3 of Group 3'] },
];

const MySectionList = () => {
  return (
    <SectionList
      width={300}
      height={250}
      sections={sections}
      sectionHeaderRenderer={renderHeader}
      sectionHeaderHeight={ROW_HEIGHT}
      rowHeight={ROW_HEIGHT}
      rowRenderer={renderRow} />}
  );
};

// before that you can use your <MySectionList /> component everywhere you need...
```

## License
MIT
