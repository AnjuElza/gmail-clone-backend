import express from 'express';

import { saveSendEmails, getEmails, toggleStarredEmail, deleteEmails, 
    moveEmailsToBin } from '../controller/email-controller.js';
import { registerUser, loginUser} from '../controller/authController.js';
import {auth} from '../middleware/auth.js';
const routes = express.Router();

routes.post('/save',auth, saveSendEmails);
routes.post('/save-draft',auth, saveSendEmails);
routes.get('/emails/:type',auth, getEmails);
routes.post('/starred',auth, toggleStarredEmail);
routes.delete('/delete',auth, deleteEmails);
routes.post('/bin',auth, moveEmailsToBin);
routes.post('/register', registerUser);
routes.post('/login', loginUser); 
// routes.get('/profile',getProfile) 
export default routes;