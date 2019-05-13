import * as sty from './Button.style';
import React, { Component } from 'react';
import { Button as ButtonBase, Icon } from 'native-base';
import { Text } from '../Text';


export class Button extends Component {
  constructor(props) { super(props); }
  renderIcon(icon) {
    return <Icon name={ icon } style={ sty.icon(this.props) }/>;
  }
  renderLeftIcon(icon) {
    return (!icon || this.props.iconRight) ? null : this.renderIcon(icon);
  }
  renderRightIcon(icon) {
    return (icon && this.props.iconRight) ? this.renderIcon(icon) : null;
  }

  render() {
    const { children, icon, label, style, ...rest } = this.props;
    return (
      <ButtonBase { ...rest }
        iconLeft={ icon && !rest.iconRight }
        large={ rest.large && !rest.small }
        style={ [sty.button(this.props), style] }
      >
        { icon ? this.renderLeftIcon(icon) : null }
        { label ?
          <Text
            style={ sty.label(rest) }>
            { label }
          </Text> :
          children ? children : null
        }
        { icon ? this.renderRightIcon(icon) : null }
      </ButtonBase>
    );
  }
}

Button.defaultProps = {
  large: true
};
