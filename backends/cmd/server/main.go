package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	firebase "firebase.google.com/go"
	"github.com/gcpug/question_board/backends"
)

func main() {
	ctx := context.Background()

	log.Print("starting server...")

	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		panic(err)
	}
	authClient, err := app.Auth(ctx)
	if err != nil {
		panic(err)
	}

	authHandler, err := backends.NewAuthHandler(ctx, authClient)
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/api/auth/hello", authHandler.Handler)
	http.HandleFunc("/", handler)

	// Determine port for HTTP service.
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("defaulting to port %s", port)
	}

	// Start HTTP server.
	log.Printf("listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	name := os.Getenv("NAME")
	if name == "" {
		name = "World"
	}

	fmt.Fprintf(w, "Hello %s!\n", name)
}
