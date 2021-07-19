var gcpubqb = {};

(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result);
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            gcpubqb.currentUser = result.user;
        }).catch((error) => {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}());

gcpubqb.insertEvents = function(eventName) {
    var db = firebase.firestore();

    var roles = {}
    roles[gcpubqb.currentUser.uid] = "owner"
    db.collection("Events").add({
        Name: eventName,
        CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        Roles: roles
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
};

gcpubqb.listEvents = function() {
    var db = firebase.firestore();
    var eventList = new Vue({
        el: '#eventList',
        data: {
          events: []
        }
      });

    db.collection("Events").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            eventList.events.push({
                "Id":doc.id,
                "Name":doc.data().Name,
                "CreatedAt":doc.data().CreatedAt,
            });
        });
    });
    
};