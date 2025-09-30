//definição dos dados
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:       {type: String, required: true },
    email:      {type: String, required: true, unique: true},
    password:   {type: String, required: true},
    isAdmin:    {type: Boolean, default: false}
});

const User = mongoose.model("User", userSchema, "users");
//Parametros: nome do modelo, esquema, nome da coleção no MongoDB
export default User;