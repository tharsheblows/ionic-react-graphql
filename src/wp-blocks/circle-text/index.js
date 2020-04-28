import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MJJCircleText from './MJJCircleText'

export const circleText = attributes => {
  return ReactDOMServer.renderToStaticMarkup(
    <MJJCircleText attributes={attributes} />
  )
}
