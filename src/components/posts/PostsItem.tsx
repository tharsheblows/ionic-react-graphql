import { IonCard, IonImg } from '@ionic/react'
import React, { useMemo } from 'react'

import styles from './PostsItem.module.scss'
import { Post } from '../../generated/graphql'
import noPhoto from '../../assets/images/no-photo.svg'
import { formatDate } from '../../utils/formatDate'

interface Props {
	post: Post
}

const PostsItem: React.FC<Props> = (props) => {
	const { post } = props
	const date = useMemo( () => formatDate( post.date ), [post.date] )

	return (
		<IonCard
			button
			className={styles.card}
			routerLink={`/posts/${post.slug}`}
		>
			<IonImg src={noPhoto} className={styles.img} />
			<div className={styles.cardTitle}>
				<h2
					className={styles.cardHeading}
					dangerouslySetInnerHTML={{ __html: post.title }}
				></h2>
				{date}
			</div>
		</IonCard>
	)
}

export default PostsItem
