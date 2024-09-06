import { v4 } from 'uuid';

import User from '../models/User';

import * as Yup from 'yup';


class UserController { 
    async store(request, response) { 
        const schema = Yup.object({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });

     try{
            schema.validateSync(request.body, { abortEarly: false});
        } catch (err) {
            return response.status(400).json({ error: err.errors });
         }

     const { nome, email, password, admin} = request.body;

    const userExist = await User.findOne({
        where: {
            email,
        },
    });

    if (userExist) {
        return response.status(400).json({ error: 'User ja existe'});
 }
     const user = await User.create({
        id: v4(),
        nome,
        email,
        password,
        admin,
     });


    return response.status(201).json(
        {id: user.id, nome, email,})
}
}

export default new UserController();