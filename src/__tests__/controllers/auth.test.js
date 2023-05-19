import { createNewUserProfile} from "../../controllers/auth.controller"
import User from "../../models/user";
import { createUsr } from "../../services/auth.service";

//to prevent direct call to the database, we mock the user schema
jest.mock("../../models/user");
jest.mock('../../services/auth.service', () =>({
    createUsr:jest.fn((x) => x),
}))

const req = {
    body:{
        firstName:"fake_name",
        email:"test@gmail.com",
        lastName:"fake_last",
        profileImage:"pic.png",
        nationality:"CM",
        dateOfBirth:"1990-10-10",
        maritalStatus:"single",
        genger:"female",
        password:"fake_Pass@123"
    }
};

it('should send a status code of 400 when user already exists', async() =>{
    User.findOne.mockImplementationOnce(() => ({
        id:1,
        firstName:"fake_name",
        email:"test@gmail.com",
        lastName:"fake_last",
        profileImage:"pic.png",
        nationality:"CM",
        dateOfBirth:"1990-10-10",
        maritalStatus:"single",
        genger:"female",
        password:"fake_Pass@123"
    }))

    const res = {
        status : jest.fn((x) => x),
        json:jest.fn((x) => x)
    }
    await createNewUserProfile(req, res)
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
});

// it('should send a status code of 201 when user is created', async () =>{
//     User.findOne.mockResolvedValueOnce((undefined));
//     User.create.mockResolvedValueOnce({
//         firstName:"fake_name",
//         email:"test@gmail.com",
//         lastName:"fake_last",
//         profileImage:"pic.png",
//         nationality:"CM",
//         dateOfBirth:"1990-10-10",
//         maritalStatus:"single",
//         genger:"female",
//         password:"fake_Pass@123"

//     })
//     const res = {
//         status : jest.fn((x) => x),
//         json:jest.fn((x) => x)
//     }
//     await createNewUserProfile(req, res)
//     expect(createUsr).toHaveBeenCalledWith(req.body);
//     expect(res.status).toHaveBeenCalledWith(201);
//})

