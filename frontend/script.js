document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('runCodeButton').addEventListener('click', async () => {
        const code = document.getElementById('codeInput').value;
        const language = document.getElementById('languageSelect').value;

        try {
            const response = await fetch('http://localhost:3000/api/execute/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: language,
                    script: code,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                document.getElementById('output').innerText = result.output;
            } else {
                document.getElementById('output').innerText = `Error: ${result.errorMessage}`;
            }
        } catch (error) {
            document.getElementById('output').innerText = `Error: ${error.message}`;
        }
    });
});
