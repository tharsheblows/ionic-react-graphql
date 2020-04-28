import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MJJCodeHighlighting from './MJJCodeHighlighting'

export const codeHighlighting = attributes => {
  return ReactDOMServer.renderToStaticMarkup(
    <MJJCodeHighlighting attributes={attributes} />
  )
}
