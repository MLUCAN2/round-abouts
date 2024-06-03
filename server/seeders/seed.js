const db = require('../config/connection');
const { User, Trip, Activity } = require('../models');
const userSeeds = require('./userSeeds.json');
const tripSeeds = require('./tripSeeds.json');
const activitySeeds = require('./activitySeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try{
        await cleanDB('User', 'users');
        await cleanDB('Trip', 'trips');
        await cleanDB('Activity', 'activities');

        // Insert the user seeds
        const users = await User.insertMany(userSeeds);
        console.log('Users inserted:', users);

        // Create and update trip
        for (let i=0; i < tripSeeds.length; i++){
            const {_id, userEmail}= await Trip.create(tripSeeds[i]);
            await User.findOneAndUpdate(
                {email: userEmail},
                {
                    $addToSet:{
                        trips: _id
                    },
                }
            );
        }
        console.log('Trips added and users updated');

        // Create and update activity
        for (let i=0; i < activitySeeds.length; i++){
            const {_id, tripName}= await Activity.create(activitySeeds[i]);
            await Trip.findOneAndUpdate(
                {name: tripName},
                {
                    $addToSet:{
                        activities: _id
                    },
                }
            );
        }
        console.log('Activity added successfully');
    }
    catch (err){
        console.error(err);
        process.exit(1);
    }
    console.log()
})

