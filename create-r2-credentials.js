// create-r2-credentials-v2.js
// Updated script with correct API endpoint

const CLOUDFLARE_API_TOKEN = "SStViTp3weY9010ewMU0fhpf9vhKwtrT52pDhfUJ";
const ACCOUNT_ID = "f9d1494fbb123cd75592643bbbbb2ef8";

async function createR2Credentials() {
  console.log("Creating R2 API credentials...\n");

  try {
    // Try the correct endpoint for R2 credentials
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/api_tokens`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "cribwise-r2-uploads",
          permissions: ["read", "write"]
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("✅ SUCCESS! Your R2 API Credentials:\n");
      console.log("═══════════════════════════════════════");
      console.log("Access Key ID:", data.result.access_key_id);
      console.log("Secret Access Key:", data.result.secret_access_key);
      console.log("═══════════════════════════════════════\n");
      console.log("⚠️  IMPORTANT: Save these credentials now!");
      console.log("They won't be shown again.\n");
      
      console.log("📝 Add these to your .env.local file:");
      console.log("NEXT_PUBLIC_R2_ACCOUNT_ID=" + ACCOUNT_ID);
      console.log("R2_ACCESS_KEY_ID=" + data.result.access_key_id);
      console.log("R2_SECRET_ACCESS_KEY=" + data.result.secret_access_key);
    } else {
      console.error("❌ Error:", data.errors || data.messages);
      console.log("\n📌 Response details:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Request failed:", error.message);
  }
}

createR2Credentials();