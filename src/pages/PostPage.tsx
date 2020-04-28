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
import { useGet_Post_By_SlugQuery, Post } from '../generated/graphql'

const PostPage: React.FC = () => {
  const { slug } = useParams<{slug: string}>()
  const { data, loading, error } = useGet_Post_By_SlugQuery({
		variables: { slug },
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
                  post={data!.postBy as Post}
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
