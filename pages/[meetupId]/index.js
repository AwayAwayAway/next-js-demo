import MeetupDetail from '../../components/meetups/MeetupDetail';
import {MongoClient, ObjectId} from 'mongodb';
import {Fragment} from 'react';
import Head from 'next/head';

const MeetupDetails = props => {
	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name='description' content={props.meetupData.description}/>
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	)
};

export const getStaticProps = async context => {
	// fetch data for a single meetup
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect('mongodb+srv://admin:7831371Ares1@reacttest.wvttz.mongodb.net/meetups?retryWrites=true&w=majority');

	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description
			}
		}
	};
};

export const getStaticPaths = async () => {
	const client = await MongoClient.connect('mongodb+srv://admin:7831371Ares1@reacttest.wvttz.mongodb.net/meetups?retryWrites=true&w=majority');

	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

	client.close();

	return {
		fallback: false,
		paths: meetups.map(meetup => ({
			params: {meetupId: meetup._id.toString()}
		}))
	};
};

export default MeetupDetails;