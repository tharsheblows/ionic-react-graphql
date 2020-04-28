import React from 'react'
import { IonRouterOutlet } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'

import PostPage from '../pages/PostPage'
import PostsPage from '../pages/PostsPage'

const Router: React.FC = props => (
  <IonReactRouter>
    {props.children}
    <IonRouterOutlet id='main-content'>
      <Route path="/posts" exact>
        <PostsPage />
      </Route>
	  <Route path="/posts/:slug" exact>
        <PostPage />
      </Route>
      <Route path="/" exact>
        <Redirect to="/posts" />
      </Route>
    </IonRouterOutlet>
  </IonReactRouter>
)

export default Router
