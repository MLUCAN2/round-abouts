// Model for trips
const {Schema, model}= require('mongoose');

const tripSchema= new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tripName:{
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    description:{
        type: String,
    },
},
{
    timestamps: true,
});

const Trip= model('Trip', tripSchema);

module.exports= Trip;
