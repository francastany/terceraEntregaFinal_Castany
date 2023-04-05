const form = document.getElementById("loginForm");
form.addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => {
        obj[key] = value;
    })
    const result = await fetch('/api/sessions/', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (result.status === 200) {
        await fetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.replace('/api/products')
    }
    else {
        alert("Wrong Password");
    }
})