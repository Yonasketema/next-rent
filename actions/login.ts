"use server";
import { signupSchema } from "@/lib/zodSchemas";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function signupUser(state:any,data:FormData) {

  
  
  const { email, location, phone, password ,confirmPassword} = Object.fromEntries(data);
  
  const {error:zodError,data:newUser} = signupSchema.safeParse({email, location,phone, password, confirmPassword })
  
  if(zodError){
    return {errors:zodError.format()}
  }
  
  try {
    const hashedPassword = await bcrypt.hash(newUser.password, 12);

    const user = await prisma.user.create({
      data: {
        email:newUser.email,
        password: hashedPassword,
        location:newUser.location,
        phone:newUser.phone,
      },
    });

    return { user };
  } catch (error) {
    return { errors: error.message };
  }

}
