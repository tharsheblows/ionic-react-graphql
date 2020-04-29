import { circleText } from './circle-text'
import { codeHighlighting } from './code-highlighting'

export function getLocalBlock(block) {
  const { blockName, attrs } = block
  let html = ''
  switch (blockName) {
    case 'mjj-why/circle-text':
      html += circleText(attrs)
      break
    case 'mjj-why/code-highlighting':
      html += codeHighlighting(attrs)
	  break
	default:
	  break
  }
  return html
}
