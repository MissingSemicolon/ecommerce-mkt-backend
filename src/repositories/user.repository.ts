import User from "../models/user.model";

const findByEmail = async (email: string) => {
    return User.findOne({ email });
};

const create = async (userData: any) => {
    const user = new User(userData);
    return user.save();
};

const findById = async (id: string) => {
    return User.findById(id);
};

export default { findByEmail, create, findById };