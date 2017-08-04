import React, { PureComponent } from 'react';
import { List } from 'react-virtualized';

export default class SectionList extends PureComponent {
  static defaultProps = {
    ...List.defaultProps,
    sections: [],
  };
  constructor(props, context) {
    super(props, context);

    this.getListRef = this.getListRef.bind(this);
    this._rowHeight = this._rowHeight.bind(this);
    this._renderItem = this._renderItem.bind(this);

    this.state = this._computeState(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._computeState(nextProps));
  }
  _computeState(props) {
    const itemCount = props.sections.reduce((v, section) => {
      return v + section.data.length + 1; // Add one for the section header.
    }, 0);

    const { sectionHeaderRenderer,  sectionHeaderHeight, rowRenderer, rowHeight, ...childProps } = props;

    return {
      childProps: {
        ...childProps,
        rowCount: itemCount,
        rowHeight: this._rowHeight,
        rowRenderer: this._renderItem,
      },
    };
  }
  _rowHeight({index}) {
    const info = subExtractor(this.props.sections, index);
    if (!info) {
      return 0;
    }

    if(!!info.header) {
      if(!!this.props.sectionHeaderRenderer) {
        if(!!this.props.sectionHeaderHeight) {
          return typeof this.props.sectionHeaderHeight === "function" ? this.props.sectionHeaderHeight({index}) : +this.props.sectionHeaderHeight;
        }
      } else {
        return 0;
      }
    }

    return typeof this.props.rowHeight === "function" ? this.props.rowHeight({index}) : +this.props.rowHeight;
  }
  _renderItem({ key, index, isScrolling, isVisible, style, parent }) {
    const info = subExtractor(this.props.sections, index);
    if (!!info) {
      if(!!info.header) {
        if(!!this.props.sectionHeaderRenderer) {
          return this.props.sectionHeaderRenderer({
            key,
            title: info.section.title || null,
            sectionIndex: info.sectionIndex,
            isScrolling,
            isVisible,
            parent,
            style
          });
        }
      } else {
        return this.props.rowRenderer({
          key,
          item: info.section.data[info.index],
          sectionIndex: info.sectionIndex,
          rowIndex: info.index,
          isScrolling,
          isVisible,
          parent,
          style
        });
      }
    }

    return null;
  }
  getListRef() {
    return this._listRef;
  }
  render() {
    return (
      <List {...this.state.childProps} ref={this._captureRef} />
    );
  }
  _listRef;
  _captureRef = ref => {
    this._listRef = ref;
  };
}

function subExtractor(sections=[], index) {
  let itemIndex = index;
  for (let ii = 0; ii < sections.length; ii++) {
    const section = sections[ii];
    itemIndex -= 1; // The section adds an item for the header
    if (itemIndex >= section.data.length) {
      itemIndex -= section.data.length;
    } else if (itemIndex === -1) {
      return {
        section,
        sectionIndex: ii,
        index: null,
        header: true,
      };
    } else {
      return {
        section,
        sectionIndex: ii,
        index: itemIndex,
        header: false,
      };
    }
  }
};
