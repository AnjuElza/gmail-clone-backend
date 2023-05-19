import Email from "../model/email.js";



export const saveSendEmails = async (request, response) => {
   
    try {
        const email = await new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const getEmails = async (request, response) => {
    // const {email}= request.body;
    //const {email}= email;
    const email = request.header("email");
    try {
         const data1= request.body;
         
        //  console.log(email)
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false, to:`${email}`});
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true, from:`${email}` })
        // } else if (request.params.type === 'allmail') {
        //     emails = await Email.find({(to:`${email}`|| from:`${email}`)});
        } else if (request.params.type === 'inbox') {
            // emails = [];
            emails = await Email.find({to:`${email}` })
        } else {
            emails = await Email.find({ type: request.params.type, from:`${email}`});
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const toggleStarredEmail = async (request, response) => {
    try {   
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value }})
        response.status(201).json('Value is updated');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async (request, response) => {
    try {
        await Email.deleteMany({ _id: { $in: request.body }})
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true, starred: false, type: '' }});
    } catch (error) {
        response.status(500).json(error.message);   
    }
}