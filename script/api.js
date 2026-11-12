const jokeContainer = document.getElementById("jokeContainer");
const quoteContainer = document.getElementById("quoteContainer");

export const getJoke = async () => {
    const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve joke.");
    }

    const data = await response.json();

    return data;
};

export const displayJoke = async () => {
    try {
        jokeContainer.innerHTML = "Loading joke...";

        const joke = await getJoke();

        jokeContainer.innerHTML = `
            <p>${joke.setup}</p>
            <p>${joke.punchline}</p>
        `;
    } catch (error) {
        jokeContainer.innerHTML = "Unable to load joke.";
    }
};


export const getQuote = async () => {
    const response = await fetch(
        "https://dummyjson.com/quotes/random"
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve quote.");
    }

    const data = await response.json();

    return data;
};

export const displayQuote = async () => {
    try {
        quoteContainer.innerHTML = "Loading quote...";

        const quote = await getQuote();

        quoteContainer.innerHTML = `
            <p>${quote.quote}</p>
            <p>${quote.author}</p>
        `;
    } catch (error) {
        quoteContainer.innerHTML = "Unable to load quote.";
    }
};
