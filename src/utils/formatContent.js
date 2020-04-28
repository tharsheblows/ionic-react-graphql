import { parse } from '@wordpress/block-serialization-default-parser'
import { getLocalBlock } from '../wp-blocks'

export const parseContent = (html, wordPressUrl, prefix = '') => {
	//Is there a better way to do this? Rather than sequentially?
	// First clean up the links.

	let finalHtml = ''
	const blocks = html ? parse(html) : {}

	for (const block in blocks) {
		if (blocks.hasOwnProperty(block)) {
			// This probably doesn't handle inner blocks.
			const indivBlock = blocks[block]
			const {
				blockName,
				innerHTML,
				innerBlocks,
				innerContent,
			} = indivBlock
			if (blockName && blockName.startsWith('core')) {
				if (innerBlocks.length > 0) {
					finalHtml += renderBlock(indivBlock)
				}
				finalHtml += createLocalLinks(innerHTML, wordPressUrl, prefix)
			} else if (blockName) {
				finalHtml += createLocalLinks(getLocalBlock(blocks[block] ), wordPressUrl, prefix)
			} else if (!blockName && innerHTML) {
				finalHtml += createLocalLinks(innerHTML, wordPressUrl, prefix)
			}
		}
	}

	return finalHtml
}

// This switches the install links to the netlify links
let createLocalLinks = (html, wordPressUrl, prefix = '') => {
	const regex = /href\s*=\s*(['"])(https?:\/\/.+?)(img)?(src=['"]https?:\/\/.+?)?(\/a>)/gi
	const isImgHttps = /src=(['"])(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi
	let link
	while ((link = regex.exec(html)) !== null) {
		if (link[2].includes(wordPressUrl) && link[4] === undefined) {
			html = html.replace(wordPressUrl, `/${prefix}`)
		}
	}
	let src
	while ((src = isImgHttps.exec(html)) !== null) {
		if (src[2].includes('http:')) {
			let quoted = `src=${src[1]}http:`
			let quotedRE = new RegExp(quoted, 'g')
			html = html.replace(quotedRE, 'src=' + src[1] + 'https:')
		}
	}
	return html
}

// This copies the php function: https://developer.wordpress.org/reference/functions/render_block/
let renderBlock = (indivBlock) => {
	// console.log(indivBlock)
	let index = 0
	let blockContent = ''
	//console.log('hey')
	let innerContent = indivBlock.innerContent
	//console.log('there')
	innerContent.forEach((element) => {
		let isString = typeof element === 'string'
		blockContent += isString
			? element
			: renderBlock(indivBlock.innerBlocks[index++])
	})
	return blockContent
}

export const createLocalLink = (url, wordPressUrl, prefix = '') => {
	if (`#` === url) {
		return null
	}
	return url.replace(wordPressUrl, prefix)
}
