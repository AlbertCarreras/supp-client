import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react'

class IconMenuHeader extends Component {
    render() {
        return (
            <Fragment>
                    <Icon 
                        color='teal' 
                        name='list alternate' 
                    />
                    <Icon 
                        color='teal' 
                        name='chat' 
                    />
            </Fragment>
        );
    }
}

export default IconMenuHeader;