/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import { Component } from '@wordpress/element'
import { circleTextStyles } from './styles.js'

class MJJCircleText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let attributes = this.props.attributes
    return (
      // templatestart
      <div>
        <div css={circleTextStyles}>
          <div className="circle">
            <a href={attributes.circleLink1}>
              <span>{attributes.circleText1}</span>
            </a>
          </div>
          <div className="circle">
            <a href={attributes.circleLink2}>
              <span>{attributes.circleText2}</span>
            </a>
          </div>
          <div className="circle">
            <a href={attributes.circleLink3}>
              <span>{attributes.circleText3}</span>
            </a>
          </div>
        </div>
      </div>
      // templateend
    )
  }
}

export default MJJCircleText
