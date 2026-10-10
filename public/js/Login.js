async function LoginPost(event) {
    event.preventDefault();

    const form = event.target;
    const data = {
        username: form.username.value,
        password: form.password.value,
    };

    console.log(data)

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok || result.status !== "success") {
            throw new Error(result.message || "Falha no login");
        }

        // Salva o token (localStorage é o mais comum em SPAs)
        localStorage.setItem("token", result.token);

        // Redireciona para a página inicial (ou dashboard)
        window.location.href = "/";
    } catch (err) {
        console.error("Erro no login:", err);
        alert("Usuário ou senha inválidos");
    }
}

// Associa ao formulário quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) form.addEventListener("submit", LoginPost);
});