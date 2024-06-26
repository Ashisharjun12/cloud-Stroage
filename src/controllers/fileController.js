

const fileUpload = async(req,res,next)=>{

    res.status(200).json({
        success:true,
        msg:"hello from file controller..."
    })



}


export { fileUpload}