const { where } = require('sequelize');
const {db, sequelize} = require('../models/index.js');
const User = db.user;
const Contact = db.contact;
const myEmitter = require('./emitter.js');
const { faker } = require('@faker-js/faker');

const { v4: uuidv4 } = require('uuid');

// read user through Store Procedure --
/*

*/ 

const getUsers = async(req, res) => {    
    const users = await User.findAll();
   
    //Notify user about his profile has seen..
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

// add fake data in database - mysql
const addFakeUsers = async(req, res) => {

    const user = {
        user_uuid: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name:faker.person.lastName(),
        phone_number:faker.phone.number(),
        date_of_birth: faker.date.birthdate(),   
        user_type:2     
    }

    if(user.length>1){
        //create bulk
        userData = await User.bulkCreate(user);       
    }else{
        userData = await User.create(user);  // create() = build() + save()
    }
    res.status(201).json({data: user});
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

// On Update user info , there is a trigger which update audit table in database with new value and keep old value as well. Trigger name:update
/*
DELIMITER //

CREATE TRIGGER after_user_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (user_id, old_first_name, old_last_name, new_first_name, new_last_name)
    VALUES (OLD.id, OLD.first_name, OLD.last_name, NEW.first_name, NEW.last_name);
END //

DELIMITER ;
*/ 
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

const getStoreProcedureValue = async(req, res) => {

    try{
        const [results, metadata] = await sequelize.query('CALL getAll()');
        console.log("-----------------------------------------------")
        console.log('results:',results, metadata);
        console.log("-----------------------------------------------")
        res.json(results);
    }catch(error){
        console.log("-----------------------------------------------")
        console.log("error:",error);
        console.log("-----------------------------------------------")
        res.status(500).send(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getFullDetails,
    getStoreProcedureValue,
    addFakeUsers
}