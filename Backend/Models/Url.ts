import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    link: {
        type: String,
        required: true,
    }
});

const Url = mongoose.model('Url', UrlSchema);
export default Url;