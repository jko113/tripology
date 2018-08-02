let rootUrl = "http://localhost:5001";

if (window.location.hostname !== "localhost") {
    rootUrl = "";
}

export const rootUrl;