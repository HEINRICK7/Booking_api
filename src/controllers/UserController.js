const connection = require('../database/connections');
const crypton = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    async store(req, res){
        const { name, email, password } = req.body;

        const id = crypton.randomBytes(8).toString('HEX');
        
        const hash = bcrypt.hashSync(password, 10)

        const user = await connection('users')
            .where({email:email})
            .first()
                if(name !== '' && email !== '' && password !== ''){

                    if(user){
                        res.status(201).json({
                            error: "Email já cadastrado no nosso banco de dados"
                        })
                    }else{        
                        await connection('users').insert({
                            id,
                            name,
                            email,
                            password: hash,
                        })
                        return res.json({ id }); 
                    }
                }else{
                    return res.json({message: 'Preencha todos os campos'})
                }   

    },
    async index(req, res){
        const users = await connection('users')
        .select(
            'id',
            'name',
            'email',
        ).from('users')
            
        return res.json(users)
        console.log(users)
    }



}