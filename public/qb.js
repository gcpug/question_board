window.addEventListener('load', (event) => {
    let searchParams = new URLSearchParams(window.location.search);
    let eventID = searchParams.get("event");
    gcpugqb.eventID = eventID;

    gcpugqb.listQuestion(eventID);
});
