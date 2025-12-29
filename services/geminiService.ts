import { GoogleGenAI, Chat } from "@google/genai";

// Ensure API Key is available
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      temperature: 0.7,
      systemInstruction: `Kamu adalah "SORA" (Sobat Rantau), teman virtual yang suportif, hangat, dan pengertian untuk mahasiswa perantauan. 
      Tugasmu adalah mendengarkan keluh kesah mereka tentang homesickness, overthinking, kesepian, atau masalah kuliah.
      
      Gaya bicaramu:
      - Gunakan Bahasa Indonesia yang santai, gaul tapi sopan (seperti teman sebaya).
      - Jangan terlalu formal seperti robot.
      - JANGAN gunakan format Markdown seperti huruf **tebal** (bold) atau *miring* (italic). Gunakan teks biasa saja agar mudah dibaca.
      - Berikan validasi emosi (contoh: "Wajar kok ngerasa gitu", "Peluk jauh ya").
      - Berikan saran kecil yang praktis (micro-habits) untuk membangun rutinitas.
      - Jika pengguna terdengar sangat depresi, sarankan bantuan profesional dengan lembut.
      
      Konteks: Pengguna adalah mahasiswa yang sedang jauh dari rumah.`,
    },
  });
};

export const sendMessageToGemini = async (chatSession: Chat, message: string): Promise<string> => {
  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Maaf, Sora lagi ngelamun nih. Coba lagi ya?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sora sedang mengalami gangguan koneksi. Coba periksa internetmu ya, Sobat.";
  }
};