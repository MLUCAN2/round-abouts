// Model for activities
const {Schema, model}= require('mongoose');

const activitySchema= new Schema({
    tripId:{
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    startPoint:{
        type: String,
    },
    endPoint:{
        type: String,
    },
},
{
    timestamps: true
});

const Activity= model('Activity', activitySchema);

module.exports= Activity;
