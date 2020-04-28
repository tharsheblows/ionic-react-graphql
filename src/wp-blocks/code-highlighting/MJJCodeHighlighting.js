/**
 * BLOCK: mjj-why-code-highlighting
 *
 * The render bit is taken from https://github.com/pantheon-systems/code-highlighting-gutenberg-block by Daniel Bachhuber
 */
import { Component } from '@wordpress/element'
import React from 'react'
// importing copied style so I can edit it
import './styles.css'
//import 'prismjs/themes/prism.css'
import './styles-header.css' // separate from the code styles because I'm happy with these.

import Prism from 'prismjs'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-git.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-nginx.js'
import 'prismjs/components/prism-php.js'
import 'prismjs/components/prism-python.js'
import 'prismjs/components/prism-sass.js'
import 'prismjs/components/prism-scss.js'
import 'prismjs/components/prism-sql.js'

import 'prismjs/components/prism-markup-templating'

// Themes to play with:
// prism.css
// prism-twilight.css
// prism-tomorrow.css
// prism-solarizedlight.css
// prism-okaidia.css
// prism-funky.css
// prism-dark.css
// prism-coy.css

// this approach is from https://www.ibenic.com/create-gutenberg-block-displaying-post/
export class MJJCodeHighlighting extends Component {
  constructor(props) {
    super(props)

    this.createHighlighting = this.createHighlighting.bind(this)
  }

  createHighlighting() {
    const { code, language } = this.props.attributes
    let html = Prism.highlight(code, Prism.languages[language], language)
    return { __html: html }
  }

  render() {
    let language = this.props.attributes.language || 'css'
    let languageClassName = 'language-' + language
    let headerClassName = 'language-header ' + language
    let languageHeading = language.toUpperCase()
    return (
      <div className="mjj-code-highlighting">
        <div className={headerClassName}>{languageHeading}</div>
        <pre className={languageClassName}>
          <code
            //id={this.id}
            className={languageClassName}
            dangerouslySetInnerHTML={this.createHighlighting()}
          ></code>
        </pre>
      </div>
    )
  }
}

export default MJJCodeHighlighting
