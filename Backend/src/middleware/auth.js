import jwt from "jsonwebtoken";

// wants to like a post
// 1. click the like button => 2. auth middleware (next) => 3. like controller

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //if  token length more than 500, it is google auth

    let decodedData;

    if(token && isCustomAuth){
        decodedData = jwt.verify(token,'test')
        req.userId = decodedData?.id;
    } else {
        decodedData = jwt.verify(token)
        req.userId = decodedData?.sub;
    }

    next()


  } catch (error) {
    console.log(error);
  }
};

export default auth