// our-domain.com/
import {MongoClient} from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import {Fragment} from 'react';
import Head from 'next/head';

const HomePage = props => {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta name='description' content='Browse a huge list of highly active Meetups!'/>
			</Head>
			<MeetupList meetups={props.meetups}/>
		</Fragment>
	);

};

export const getStaticProps = async () => {
	// fetch data from an API
	const client = await MongoClient.connect('mongodb+srv://admin:7831371Ares1@reacttest.wvttz.mongodb.net/meetups?retryWrites=true&w=majority');

	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString()
			}))
		},
		revalidate: 10
	};
};


// export const getServerSideProps = async (context) => {
// 	const req = context.req;
// 	const res = context.res;
//
// 	//fetch data from an API
//
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS
// 		}
// 	};
// };

export default HomePage;