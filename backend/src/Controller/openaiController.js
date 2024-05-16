import OpenAI from "openai";

export const openaiController = async (req, res) => {
  const openai = new OpenAI(`${process.env.OPENAI_API_KEY}`, {});

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.json({ completion: completion.choices[0].message.content }); // Send the completion content in the response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing request");
  }
};
