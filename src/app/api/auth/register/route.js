import { User } from "@/lib/model";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export const hashing = async (password) => {
    console.log('Hashing middleware is running...');
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
};


export const POST = async (req, res) => {
    try {
        connectToDb();
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
        }
        const { username, email, password } = await req.json();

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return NextResponse.json({ error: 'User or email already registered' }, { status: 400 });
        }
        let hash_password = await hashing(password);
        let user1 = new User({ username: username, email: email, password: hash_password });
        await user1.save();
        return NextResponse.json({ message: "Register successfully" });
    } catch (error) {
        console.error("Failed to register user!", error);
        return NextResponse.json({ error: "Failed to register user!" });
    }
};

function validateUser(hash) {
    bcrypt
        .compare("12345678", hash)
        .then(res => {
            console.log(res) // return true
        })
        .catch(err => console.error(err.message))
}
// validateUser("$2a$10$FKbGCfwuhmEQ2abCwTBi9.bRxwJezfD3ZdfXHSchGyex.UHG0PpYO");
