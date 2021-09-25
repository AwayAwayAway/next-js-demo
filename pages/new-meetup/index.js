// our-domain.com/mew-meetup

import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Fragment} from 'react';

const NewMeetupPage = () => {
	const router = useRouter();

	const onAddMeetup = async (enteredMeetupData)=> {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-type': 'application/json'
			}
		});

		const data = await response.json();

		console.log(data);

		router.push('/');
	};

	return(
		<Fragment>
			 <Head>
				 <title>Add a New Meetup</title>
				 <meta name='description' content='Add your own meetups and create networking opportunities'/>
			 </Head>
			<NewMeetupForm onAddMeetup={onAddMeetup}/>
		</Fragment>

	)
};

export default NewMeetupPage;