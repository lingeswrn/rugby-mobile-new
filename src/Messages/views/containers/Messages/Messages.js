// import * as sty from './Messages.style';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { SceneContainer } from 'src/lib/components';
import { View } from 'native-base';
import { FeedList } from 'src/Messages/views/components';

class _Messages extends Component {
  constructor(props) {
    super(props);
    this._RTS = props.connectRealtimeService();
  }

  componentDidMount() {
    this._RTS.getConversations()
    .then(this._RTS.getMessages);
  }

  render() {
    return (
      <View>
        <SceneContainer
          title='Message Boards'
          hideSceneFooter
          headerButtons={{
            left: { icon: 'angle-left', to: '/' }
          }}
        >
          <FeedList { ...this.props } _RTS={ this._RTS }/>
        </SceneContainer>
      </View>
    );
  }
}

export const Messages = withRouter(_Messages);
