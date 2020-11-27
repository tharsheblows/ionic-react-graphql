import { Plugins } from '@capacitor/core'
import React from 'react'
import {
	IonPage,
	IonTitle,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonContent,
	IonBackButton,
	IonButton
} from '@ionic/react'

const { Browser } = Plugins;


const OutsideSite: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="primary">
					<IonButtons slot="start">
						<IonBackButton defaultHref="/posts" />
					</IonButtons>
					<IonTitle>A button to take you to an outside website</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className='ion-padding'>
				<IonButton
					onClick={async () =>
						await Browser.open({
							url: 'http://capacitorjs.com/',
						})
					}
					style={{ marginTop: '100px' }}
				>
					Open Browser
				</IonButton>
			</IonContent>
		</IonPage>
	)
}

export default OutsideSite