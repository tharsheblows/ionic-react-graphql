import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonMenuButton
} from '@ionic/react'
import React from 'react'

import Posts from '../components/posts/Posts'

const PostsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>SpaceX Posts! :(</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Posts />
      </IonContent>
    </IonPage>
  )
}

export default PostsPage
