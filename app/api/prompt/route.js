import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const data = await Prompt.find({}).populate("creator");
    console.log(data,"prompt data")
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error;
    return new Response(JSON.stringify("Failed to fetch all prompts"), {
      status: 500,
    });
  }
};
