import {
	IonText,
	IonCard,
	IonItem,
	IonAvatar
} from '@ionic/react'
import React, { useMemo } from 'react'
import styles from './PostDetail.module.scss'
import { Post } from '../../generated/graphql'
import { formatDate } from '../../utils/formatDate'
import { parseContent } from '../../utils/formatContent'

import '@wordpress/block-library/build-style/style.css'
import '@wordpress/block-library/build-style/theme.css'

interface Props {
	post: Post
	onSelectImage?: (url: string) => void
}

const PostDetail: React.FC<Props> = (props) => {
	const { post } = props
	const formattedDate = useMemo( () => formatDate( post.date ), [post.date])
	return (
		<IonCard className={styles.postCard} color="light">
			<IonItem lines="none">
				<IonAvatar></IonAvatar>
				<IonText>
					<h2
						className={styles.cardHeading}
						dangerouslySetInnerHTML={{ __html: post.title }}
					></h2>
					<p>{formattedDate}</p>
				</IonText>
			</IonItem>
			<IonText>
				<div dangerouslySetInnerHTML={{ __html: parseContent( post.content, 'https://tharshetests.netlify.app' ) }}></div>
			</IonText>
		</IonCard>
	)
}

export default PostDetail
