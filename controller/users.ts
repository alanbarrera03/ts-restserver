import { Request, Response } from 'express';
import { json } from "sequelize/types";
import User from '../models/user';

export const getUsers = async( req: Request, res: Response ) => {

    const users = await User.findAll();

    res.json( { users } );

}

export const getUser = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if( user ) {

        res.json( user );

    } else {

        res.status( 400 ).json( {

            msg: `Not exist a user with ID ${ id }`

        } );

    }

    res.json( user );

}

export const postUser = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const existEmail = await User.findOne( {

            where: {

                email: body.email

            }

        } );

        if( existEmail ) {

            return res.status( 400 ).json( {

                msg: 'Exist a user with email ' + body.email

            } );

        }

        const user = new User( body );
        await user.save();

        res.json( user );
        
    } catch (error) {

        console.log( error );

        res.status( 500 ).json( {
    
            msg: 'Contact your Administrator',
    
        } )
        
    }


}

export const putUser = async( req: Request, res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk( id );
        
        if( !user ) {

            return res.status( 404 ).json( {

                msg: `Don't exist a user with ID ` + id

            } );

        }


        await user.update( body );

        res.json( user );
        
    } catch (error) {

        console.log( error );

        res.status( 500 ).json( {
    
            msg: 'Contact your Administrator',
    
        } )
        
    }

}

export const deleteUser = async( req: Request, res: Response ) => {

    const { id }   = req.params;

    const user = await User.findByPk( id );
        
    if( !user ) {

        return res.status( 404 ).json( {

            msg: `Don't exist a user with ID ` + id

        } );

    }

    await user.update( { status: false } );

    res.json( user );

}