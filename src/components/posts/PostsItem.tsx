import {
  IonCard,
  IonImg
} from '@ionic/react'
import React from 'react'

import { crop } from '../../utils/crop'
import styles from './PostsItem.module.scss'
import { Post } from '../../generated/graphql'
import noPhoto from '../../assets/images/no-photo.svg'

interface Props {
  post: Post
}

const PostsItem: React.FC<Props> = (props) => {
  const { post } = props

  return (
    <IonCard button className={styles.card} routerLink={`/posts/${post.id}`}>
      <IonImg src={noPhoto} className={styles.img} />
      <h2 className={styles.cardTitle}>{crop(post.id, 15)}</h2>
      <p className={styles.cardSubtitle}>{post.title}</p>
    </IonCard>
  )
}

export default PostsItem
