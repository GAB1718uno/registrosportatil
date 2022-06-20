import jwt from "jsonwebtoken";

const generarJwt = ( uid:any, usuario:any, email:any) => {

    const payload = {
        uid,
        usuario
    }

    return new Promise ( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED!, {

            expiresIn:'24h'
        }, (err, token) => {
                // TODO MAL
            if (err){
                    reject( err );
            } else
            //TODO BIEN
            resolve( token ) 
    
        })  

    } )

}

export default generarJwt;