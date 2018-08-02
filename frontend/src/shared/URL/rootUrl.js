let theUrl = "http://localhost:5001";

if (window.location.hostname !== "localhost") {
    theUrl = "";
}

export const rootUrl = theUrl;