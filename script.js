document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const phoneNumber = document.getElementById("phoneNumber").value;
    const message = encodeURIComponent(document.getElementById("message").value);

    const link = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    const qrCodeImg = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link)}" alt="QR Code">`;

    const whatsappLinkElement = document.getElementById("whatsappLink");
    whatsappLinkElement.innerHTML = `
        <a href="${link}" target="_blank">${link}</a>
        <button class="btn btn-sm btn-secondary mt-2" id="copyButton">Copy Link</button>
    `;

    const qrCodeElement = document.getElementById("qrCode");
    qrCodeElement.innerHTML = qrCodeImg;

    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", function () {
        const tempInput = document.createElement("input");
        tempInput.value = link;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        const customToast = document.createElement("div");
        customToast.className = "custom-toast";
        customToast.innerHTML = "Link copied to clipboard!";
        document.body.appendChild(customToast);

        setTimeout(function () {
            customToast.classList.add("show");
        }, 10);

        setTimeout(function () {
            customToast.classList.remove("show");
            setTimeout(function () {
                document.body.removeChild(customToast);
            }, 300);
        }, 3000);
    });
});