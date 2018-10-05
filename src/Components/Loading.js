import React from 'react';
import { Loader } from 'semantic-ui-react'

const Loading = () => {
 
    return (
      <div className="overlay-box login">
        <Loader active />
      </div>
    )
}

export default Loading;