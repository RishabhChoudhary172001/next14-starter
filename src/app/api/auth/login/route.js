import { User } from "@/lib/model";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const POST = async (req, res) => {
    try {
        connectToDb();
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' });
            return;
        }
        const { email, password } = await req.json();
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ error: 'User is not Registered' });
        }

        try {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                const user_id = existingUser._id;
                const token = jwt.sign({ user_id: user_id }, 'your-secret-key', { expiresIn: '3h' });
                return NextResponse.json({ token });
            } else {
                return NextResponse.json({ error: "Email or password is wrong" });
            }
        } catch (bcryptError) {
            console.error("Error comparing passwords:", bcryptError);
            return NextResponse.json({ error: "Failed to compare passwords" });
        }
    } catch (error) {
        console.error("Failed to process login request!", error);
        return NextResponse.json({ error: "Failed to process login request" });
    }
};
