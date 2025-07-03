import { getDataFromToke } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import connect  from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const userId = await getDataFromToke(request);
    const userDetails = await User.findOne({ _id: userId }).select("-password");
    console.log(userDetails,'usr');
    
    return NextResponse.json({
      message: "User found",
      success: true,
      user: userDetails,
    },{status: 201});
  } catch (error: any) {
    console.log(error,'err');
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
