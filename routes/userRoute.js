import express from 'express';
import User from "../models/users.js";


let route = express.Router()

route.get('/', async(req, res) => { // all users

    try {
        let users = await User.find();
        res.status(200).json({
            error: false,
            message: ' users data fetched!',
            data: users
        })

    } catch (error) {
        console.log(error)
        res.status(201).json({
            error: true,
            message: 'error in users data fetching!',
            data: null
        })
    }

    res.status(200).json({
        error: false,
        message: 'users data successfully fetch!',
        data: filterData
    })

})

// params
route.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let findUser = await User.findById(id);
        if (findUser) {
            res.status(200).json({
                error: false,
                message: 'user found!',
                data: findUser
            })
        }
        /// if user not found
        res.status(404).json({
            error: false,
            message: 'user not found!',
            data: null,
        })

    } catch (error) {
        console.log(error)
         res.status(201).json({
            error: false,
            message: 'something went wrong!',
            data: null,
        })
    }
})

// Add user
route.post('/', async (req, res) => {
    try {
        let data = req.body;
        let newUser = new User({ ...data });
        newUser = await newUser.save(); // Save to MongoDB

        res.status(200).json({
            error: false,
            message: 'User successfully added!',
            data: newUser,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({  // <-- Fixed status code
            error: true,
            message: error.message || "Internal Server Error",
            data: null,
        });
    }
});

// delete user
route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        error: true,
        message: 'User not found',
        data: null,
      });
    }

    res.status(200).json({
      error: false,
      message: 'User successfully deleted!',
      data: deletedUser,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
      data: null,
    });
  }
});

// updates user
route.put('/:id', async(req,res)=>{
    try {
        let { id } = req.params;
        let updatedData = req.body;
        let updateUser = await User.findByIdAndUpdate(id, {
            ...updatedData
        })
        res.status(200).json({
            error: false,
            message: 'successfully updated!',
            data: updateUser,
        })
    } catch (error) {
        console.log("Error:", error);
        res.status(201).json({
            error: true,
            message: error,
            data: null,
        })
    }
})



export default route;