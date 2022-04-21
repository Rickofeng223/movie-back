import mongoose from "mongoose";
import Phone from 'mongoose-type-phone'
import Email from 'mongoose-type-email'

const usersSchema = mongoose.Schema({

    username: {type: String, required: true},

    first_name: {type: String, required: true},

    last_name: {type: String, required: true},

    email_id: {type: String},

    phone_no: {type: String},

    DOB: {type: Date}

});

export default usersSchema;