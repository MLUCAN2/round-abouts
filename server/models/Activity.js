// Model for activities
const {Schema, model}= require('mongoose');

const activitySchema= new Schema({
    tripId:{
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    },
    activityName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    description:{
        type: String,
    },
    destination:{
        type: String,
    },
},
{
    timestamps: true
});

const Activity= model('Activity', activitySchema);

module.exports= Activity;
