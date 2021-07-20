var gcpugqb = {};

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
            gcpugqb.currentUser = result.user;
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

gcpugqb.insertEvents = function(eventName) {
    var db = firebase.firestore();

    var roles = {}
    roles[gcpugqb.currentUser.uid] = "owner"
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

gcpugqb.listEvents = function() {
    var db = firebase.firestore();
    var eventList = new Vue({
        el: '#eventList',
        data: {
          events: []
        }
      });

    db.collection("Events").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            eventList.events.push({
                "EventID":doc.id,
                "Name":doc.data().Name,
                "CreatedAt":doc.data().CreatedAt,
            });
        });
    });
    
};

gcpugqb.insertQuestion = function(eventID, question) {
    var db = firebase.firestore();

    db.collection("Events").doc(eventID).collection("Questions").add({
        AuthorID: gcpugqb.currentUser.uid,
        AuthorName: gcpugqb.currentUser.displayName,
        Content: question,
        CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
};

gcpugqb.listQuestion = function(eventID) {
    var db = firebase.firestore();
    var questionList = new Vue({
        el: '#questionList',
        data: {
            questions: []
        }
      });

    db.collection("Events").doc(eventID).collection("Questions").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.metadata.hasPendingWrites == "Local") {
                // Local変更はスキップ
                return;
            }
            questionList.questions.push({
                "QuestionID":doc.id,
                "AuthorID":doc.data().AuthorID,
                "AuthorName":doc.data().AuthorName,
                "Content":doc.data().Content,
                "CreatedAt":doc.data().CreatedAt,
            });
        });
    });
    
};