import jwt from "jsonwebtoken";

export const authenticate = (req, res, next)=>{
    const header = req.headers.authorization;
    if(!header){
        return res.status(400).json({message: "Faça o login."})
    }
    const [scheme, token] = header.split(" ")
    if(scheme !== "Bearer" || !token){
        return res.status(400).json({message: "Tipo de token inválido ou sem token."})
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT)
      res.user = decoded
      next() // vai para as rotas privadas
    }catch(e){
        return res.status(400).json({message: "Token inválido ou vencido. Faça login novamente."})
    }
}
export const authorizaAdmin = (req, res, next)=>{
    const user = req.body
    if(!user.isAdmin){
        return res.status(400).json({message: "Acesso negado. Somente usuários Administradores."})
    }
    next(); 
}