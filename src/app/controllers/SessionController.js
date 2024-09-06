import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const isValid = await schema.isValid(request.body);

        if (!isValid) {
            return response.status(481).json({ error: 'Make aure your email or passord'});

        }

      const { email, password } = request.body;

    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (!user) {
        return response.status(481).json({ error: 'Make aure your email or passord'});

    }

    const isSamePassword = await user.comparePassword(password);

    if (!isSamePassword) {
        return response.status(481).json({ error: 'Make sure yuor email or password are correct'});

    }

        return response.status(201).json({ 
            id: user.id,
            nome: user.nome,
            email,
            admin: user.admin,
        });
    }

}

export default new SessionController();