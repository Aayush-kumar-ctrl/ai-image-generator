function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

async function generateImages() {
    const prompt = document.getElementById("prompt").value;
    const count = parseInt(document.getElementById("count").value);
    const resultDiv = document.getElementById("result");
    const gallery = document.getElementById("gallery");
    const loading = document.getElementById("loading");

    if (!prompt.trim()) {
        alert("Please enter a prompt!");
        return;
    }

    resultDiv.innerHTML = "";
    loading.style.display = "block";

    try {
        for (let i = 0; i < count; i++) {

            const img = await puter.ai.txt2img(prompt, { model: "gpt-image-1" });

            const imgBox = document.createElement("div");
            imgBox.className = "image-box";

            imgBox.appendChild(img);

            const dlBtn = document.createElement("button");
            dlBtn.className = "download-btn";
            dlBtn.innerText = "Download Image";

            dlBtn.onclick = () => {
                const link = document.createElement("a");
                link.href = img.src;
                link.download = "generated.png";
                link.click();
            };

            imgBox.appendChild(dlBtn);

            resultDiv.appendChild(imgBox);

            const galleryThumb = img.cloneNode(true);
            gallery.appendChild(galleryThumb);
        }
    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = "<p style='color:red;'>Error generating image!</p>";
    } finally {
        loading.style.display = "none";
    }
}
