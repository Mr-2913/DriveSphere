export const authorize = (...allowedRoles) =>{
    return (req, res, next)=>{
        
        if(!allowedRoles.includes(req.user.role)){
            res.status(403).json({
                success:false,
                message:"You are not authorize for perform this action"
            });
        }
        next();
    }
}