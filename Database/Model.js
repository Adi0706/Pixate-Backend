import mongoose from 'mongoose';

const Form = mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    image: { type: String, required: true },
});

const FormModel = mongoose.model('FormModel', Form);
export default FormModel;

