import React, { useState, useEffect, useCallback } from 'react'
import { IonRow, IonCol, IonGrid, IonButton, IonLoading } from '@ionic/react'

import Error from '../error/Error'
import PostsItem from './PostsItem'
import {
	useGet_PostsQuery,
	Post
} from '../../generated/graphql'


const Posts: React.FC = () => {
	const { data, loading, error, fetchMore } = useGet_PostsQuery({
		variables: {
			first: 9, // Get twenty one (because there are three columns) at a time.
			after: '', // Instead of "offset", WP GraphQL gets posts from this id (the wp-graphql id, not the post id)
		},
	})

	const [after, setAfter] = useState('')
	const [first] = useState(9)
	const [finished, setFinished] = useState(false)

	const handleLoadMore = useCallback(
		() => {
			let endCursor = data ? data.posts.pageInfo.endCursor : ''
			setAfter(endCursor)
		},
		[data]
	)

	useEffect(() => {
		// See https://www.apollographql.com/docs/tutorial/queries/.
		let endCursor = data ? data.posts.pageInfo.endCursor : ''
		if (endCursor) {
			fetchMore({
				variables: {
					first: first,
					after: endCursor,
				},
				updateQuery: (
					previous,
					{ fetchMoreResult }
				) => {
					// If nothing is fetched, return the previous.
					if ( ! fetchMoreResult ) {
						return previous
					}

					// This controls whether the bar shows but doesn't account for the multiples of first. But it's fine for now.
					if ( fetchMoreResult.posts.nodes.length < first ) {
						setFinished(true)
					}
					// I want to *add* to the posts and put the new ones at the bottom.
					return {
						...previous,
						posts: {
							...fetchMoreResult.posts,
							nodes: [
								...previous.posts.nodes,
								...fetchMoreResult.posts.nodes,
							],
						},
					}
				},
			})
		}
	}, [fetchMore, first, after])

	if (loading) {
		return <IonLoading isOpen={loading} message="Loading..." />
	}

	if (error) {
		return <Error error={error} />
	}

	return (
		<IonGrid fixed>
			<IonRow>
				{data &&
					data.posts.nodes.map((post) => (
						<IonCol key={post.id} size="12" sizeSm="6" sizeLg="4">
							<PostsItem post={post as Post} />
						</IonCol>
					))}
			</IonRow>
			{!loading && !finished ? (
				<IonRow>
					<IonCol>
						<IonButton expand="block" onClick={handleLoadMore}>
							Load more ...
						</IonButton>
					</IonCol>
				</IonRow>
			) : null}
		</IonGrid>
	)
}

export default Posts
