import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const data = await Prompt.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error;
    return new Response(JSON.stringify("Failed to fetch all prompts"), {
      status: 500,
    });
  }
};
