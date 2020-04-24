import {
  IonImg,
  IonCol,
  IonRow,
  IonText,
  IonIcon,
  IonCard,
  IonItem,
  IonAvatar,
  IonThumbnail,
  IonCardContent
} from '@ionic/react'
import { format } from 'date-fns'
import React, { useMemo } from 'react'
import styles from './PostDetail.module.scss'
import { Post } from '../../generated/graphql'
import { checkmark, close } from 'ionicons/icons'
import noPhoto from '../../assets/images/no-photo.svg'

interface Props {
  launch: Post
  onSelectImage?: (url: string) => void
}

const PostDetail: React.FC<Props> = props => {
  const { launch, onSelectImage = () => null } = props
  const date = useMemo(() => format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
    [])

  return (
    <IonCard>
      <IonItem lines='none'>
        <IonAvatar>

        </IonAvatar>
        <IonText color='dark'>
          <h2 className='ion-no-margin'>{launch.title}</h2>
          <p className='ion-no-margin'>{} | {date}</p>
        </IonText>
        <IonIcon
          slot='end'
          color={launch.id ? 'success' : 'danger'}
          icon={launch.id ? checkmark : close}
        />
      </IonItem>


      <IonCardContent>{launch.content}</IonCardContent>

    </IonCard>
)}

export default PostDetail
