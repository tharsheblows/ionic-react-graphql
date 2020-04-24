import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import {
  IonRow,
  IonCol,
  IonGrid,
  IonButton,
  IonLoading
} from '@ionic/react'

import Error from '../error/Error'
import LaunchesItem from './LaunchesItem'
import { useGet_PostsQuery, Post } from '../../generated/graphql'


const Launches: React.FC = () => {
  const { data, loading, error, fetchMore } = useGet_PostsQuery({
		variables: {
			first: 12,
			after: '',
		},
  })

  const [after, setAfter] = useState('')
  const [first] = useState(12)
  const [finished, setFinished] = useState(false)

  const handleLoadMore = useCallback(( endCursor ) => {
    setAfter( endCursor )
  }, [data])

//   useEffect(() => {
//     if (after ) {
//       fetchMore<'after'>({
//         variables: {
//           after: data.pageInfo.endCursor
//         },
//         updateQuery (previous, { fetchMoreResult }) {
//           if (!fetchMoreResult) {
//             return previous
//           }

//           if (fetchMoreResult.posts.length < limit) {
//             setFinished(true)
//           }

//           return {
//             ...previous,
//             posts: [
//               ...previous.posts,
//               ...fetchMoreResult.posts
//             ]
//           }
//         }
//       })
//     }
//   }, [fetchMore, limit, after])

  if (loading) {
    return <IonLoading isOpen={loading} message='Loading...' />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <IonGrid fixed>
      <IonRow>
        {data && data.posts.nodes.map(post => (
          <IonCol key={post.id} size='12' sizeSm='6' sizeLg='4'>
            {post.id}
          </IonCol>
        ))}
      </IonRow>
      {!loading && !finished ? (
        <IonRow>
          <IonCol>
            <IonButton expand="block" onClick={handleLoadMore}>Load more ...</IonButton>
          </IonCol>
        </IonRow>
      ) : (null)}
    </IonGrid>
  )
}

export default Launches
