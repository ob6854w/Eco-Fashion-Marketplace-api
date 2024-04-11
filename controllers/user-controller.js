const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Signup endpoint
const signup = async(req, res) => {
    const { username, name, email, password } = req.body;
   
    try {
        //Check if user with the same email already exists
        const existingUser = await knex('users').where({email}).first();
        if (existingUser) {
            return res.status(400).json({message: 'User with this email already exists'});
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
         //create new user
         const newUser = {
            username, 
            name, 
            email, 
            password: hashedPassword,
        };
        await knex("users").insert(newUser);
        res.status(201).send("Successfully created new user")
    } catch (error){
        console.error(error)
        res.status(400).send("Failed to create new user") 
    }    
};

//login endpoint
const login = async(req, res) => {
    const { username, password } = req.body;
try{
        const user = await knex("users").where("username", username).first();
        if (!user) {
            return res.status(404).send("User not registered")
        }
         //validate password
         const isPasswordValid = await bcrypt.compare(password, user.password); 
        if (!isPasswordValid){
            return res.status(400).send('Invalid password')
        } 
        //Generate token
        const token = jwt.sign(
            {id:user.id, username:user.username}, process.env.JWT_KEY, {expiresIn:"24h"}
        );  
        res.status(200).send({token}); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
};

//Authorization
async function authorize(req, res, next) {
try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: Missing or invalid token');
    }
    
    const authtoken = authorizationHeader.split(" ")[1];

    //Verify the token
    const decodedToken = jwt.verify(authtoken, process.env.JWT_KEY);

    //fetch user from database
    const user = await knex("users").where({id:decodedToken.id}).first();

    if (!user) {
        return res.status(401).send('Unauthorized: User not found');
    }
    
    //Remove password field from user object
    delete user.password;
    
    //Asign user onject to req.user
    req.user = user;

    //Call next middleware
    next();
} catch (error) {
    res.status(401).send("Unauthorized: Invalid token")
 }
}

/// Controller function for fetching user data for the dashboard
async function getDashboard(req,res) {
    try {
      // Access user ID from decoded token
      const userId = req.user.id;
      
      // Fetch user data from the database using Knex.js
      const user = await knex('users').where('id', userId).first();

      if (!user) {
        return res.status(401).send('Unauthorized: User not found');
      }

      //// Remove sensitive fields from user object
      delete user.password;

         // Respond with user data
         res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    signup,
    login,
    authorize,
    getDashboard,
};