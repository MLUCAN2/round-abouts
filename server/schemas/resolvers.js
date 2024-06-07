const { User, Trip, Activity } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({})
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("trips")
    },

    trips: async () => {
      return await Trip.find({})
    },

    trip: async (parent, {tripId}) => {
      return Trip.findOne({ _id: tripId }).populate("activities")
    },

    activities: async () => {
      return  await Activity.find({})
    },

    activitiesByUser: async (parent, { userId }) => {
      return Activity.find({ userId });
    },
    
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email:email }); 
      console.log(user)
      if (!user) {
        throw AuthenticationError;
      }
      const correctpw = await user.isCorrectPassword({ password });
      if (!correctpw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user }
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    addTrip: async (parent, { tripName, startDate, endDate, description, destination }, context) => {
      try {
        console.log(destination)
        const trip = await Trip.create({ tripName, startDate, endDate, description, destination });
       
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { trips: trip._id } }
        );

        return trip;
      } catch (error) {
        console.error('Error creating trip:', error);
        throw new Error('Failed to create trip');
      }
    },
    
    removeTrip: async (parent, { tripId }) => {
      return Trip.findOneAndDelete({ _id: tripId });
    },
    addActivity: async (parent, { activityName, date, description, destination }) => {
      return Activity.create({ activityName, date, description, destination });
    },
    removeActivity: async (parents, { activityId }) => {
      return Activity.findOneAndDelete({ _id: activityId });
    }
  },
};

module.exports = resolvers;