async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const lang = document.getElementById("lang").value;

  if (!input.value) return;

  chat.innerHTML += `<p><b>You:</b> ${input.value}</p>`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer HF_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: lang === "sq"
          ? "Përgjigju në shqip: " + input.value
          : "Answer in English: " + input.value
      })
    }
  );

  const data = await response.json();
  chat.innerHTML += `<p><b>AI:</b> ${data[0].generated_text}</p>`;
  input.value = "";
}
