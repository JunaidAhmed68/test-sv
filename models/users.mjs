import mongoose from "mongoose";
let userScheme = new mongoose.Schema(
    {
        userName: String,
        email: String,
        age: Number,
        password: String,
    },
    {
        timestamps: true,
    }
)

let User = mongoose.model("User", userScheme);
export default User;