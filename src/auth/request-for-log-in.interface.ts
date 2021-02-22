import { Request } from 'express';
import {User} from "../users/entities/user.entity";

interface RequestForLogIn extends Request {
    user: User;
}

export default RequestForLogIn;