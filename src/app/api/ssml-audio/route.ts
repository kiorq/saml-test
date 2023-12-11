import textToSpeech from "@google-cloud/text-to-speech";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const client = new textToSpeech.TextToSpeechClient();
  const [response] = await client.synthesizeSpeech({
    input: { ssml: searchParams.get("ssml") },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  });

  let audioBuffer;
  if (typeof response.audioContent === "string") {
    // If it's a string, convert from base64 to a buffer
    audioBuffer = Buffer.from(response.audioContent, "base64");
  } else if (response.audioContent instanceof Uint8Array) {
    // If it's a Uint8Array, convert it to a buffer directly
    audioBuffer = Buffer.from(response.audioContent);
  }

  if (!audioBuffer) {
    return new Response(null, {
      status: 400,
    });
  }

  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Content-Length": (audioBuffer?.length || 0).toString(),
  });

  return new Response(audioBuffer, {
    headers,
  });
}
