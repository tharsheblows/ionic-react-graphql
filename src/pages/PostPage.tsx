import {
  IonRow,
  IonCol,
  IonPage,
  IonGrid,
  IonModal,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonLoading,
  IonBackButton
} from '@ionic/react'
import { useParams } from 'react-router'
import Error from '../components/error/Error'
import React, { useState, useCallback } from 'react'
import ImageViewer from '../components/image/ImageViewer'
import PostDetail from '../components/post/PostDetail'
import { useGet_PostQuery, Post } from '../generated/graphql'

const PostPage: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const { data, loading, error } = useGet_PostQuery({
    variables: { id }
  })

  const [selectedImage, setSelectedImage] = useState('')

  const handleSelectImage = useCallback((url: string) => {
    setSelectedImage(url)
  }, [])

  const handleModalClose = useCallback(() => setSelectedImage(''), [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/posts' />
          </IonButtons>
          <IonTitle>Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid fixed>
          <IonRow>
            <IonCol sizeLg='8' offsetLg='2'>
              {loading ? (
                <IonLoading isOpen={loading} message='Loading...' />
              ) : error ? <Error error={error}/> : (
                <PostDetail
                  launch={data!.post as Post}
                  onSelectImage={handleSelectImage}
                />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonModal isOpen={!!selectedImage} onDidDismiss={handleModalClose}>
        <ImageViewer src={selectedImage} onClose={handleModalClose} />
      </IonModal>
    </IonPage>
  )
}

export default PostPage
