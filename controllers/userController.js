const { where } = require('sequelize');
const db = require('../models/index.js');
const User = db.user;
const Contact = db.contact;
const myEmitter = require('./emitter.js');

const { v4: uuidv4 } = require('uuid');






const getUsers = async(req, res) => {    
    const users = await User.findAll();
   
    myEmitter.emit('userProfileSeen', 'Akash');
    
    // res.render('users', { users });
    res.status(200).json({data:users});
}

const getUser = async(req, res) => {
    const userDataById = await User.findOne({
        where:{
            id:req.params.id
        }
    });
    
    res.status(200).json({data:userDataById});
}

const addUser = async(req, res) => {
    const user = req.body;
    let userData;
    console.log(user);
    if(user.length > 1){
        //create bulk
        userData = await User.bulkCreate(user); 
    }else{
        userData = await User.create(user);  // create() = build() + save()
    }
    res.status(201).json({data: user});
}

const updateUser = async(req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    const upateUserData = await User.update(
        userData,
        {
            where:{
                id:userId
            }
        }
    )

    res.status(200).json({data: upateUserData});
}

const deleteUser = async(req, res) => {
    const userId = req.params.id;

    const userStatus = await User.destroy({
        where: {
            id: userId,
        },
    });

    res.status(200).json({data: userStatus});
}

// One-to-One Relationship
const getFullDetails = async(req, res) => {
    
    let userDetails = await User.findAll({
        attributes:['first_name','date_of_birth'],
        include:[{
            model:contacts,
            attributes:['permanent_address','current_address']
        }]
    })
    
    res.status(200).json({data: userDetails});
}


module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getFullDetails
}