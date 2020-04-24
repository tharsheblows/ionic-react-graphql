import gql from 'graphql-tag'

export const GET_POSTS = gql`
	# Define our query variables
	query GET_POSTS($first: Int, $after: String) {
		# Ask for posts
		posts(
			# Ask for the first XX number of posts
			first: $first

			# A Cursor to where in the dataset our query should start
			# and get items _after_ that point
			after: $after
		) {
			# In response, we'll want pageInfo so we know if we need
			# to fetch more posts or not.
			pageInfo {
				# If true, we need to ask for more data.
				hasNextPage

				# This cursor will be used for the value for $after
				# if we need to ask for more data
				endCursor
			}
			nodes {
				id
				uri
				slug
				postId
				title
				content
				excerpt
				guid
			}
		}
	}
`

export const GET_POST = gql`
	query GET_POST($id: ID!) {
		post(id: $id) {
			id
			postId
			title
			date
			uri
		}
	}
`

export const GET_POST_BY_SLUG = gql`
	query GET_POST_BY_SLUG( $slug: String ) {
		postBy(slug: $slug) {
			id
			title
			slug
			uri
		}
	}
`
