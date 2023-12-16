import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const data = await Prompt.findById(params.id).populate("creator");
    if (!data) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    // console.error;
    return new Response(JSON.stringify("Failed to fetch prompt"), {
      status: 500,
    });
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const data = await Prompt.findById(params.id);
    if (!data) return new Response("Prompt not found", { status: 404 });

    data.prompt = prompt;
    data.tag = tag;

    await data.save();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    // console.error;
    return new Response(JSON.stringify("Failed to update prompt"), {
      status: 500,
    });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
