package backends

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"firebase.google.com/go/auth"
)

type AuthHandler struct {
	fireAuth *auth.Client
}

func NewAuthHandler(ctx context.Context, fireAuth *auth.Client) (*AuthHandler, error) {
	return &AuthHandler{
		fireAuth: fireAuth,
	}, nil
}

func (h *AuthHandler) Handler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	t := r.Header.Get("Authorization")

	token, err := h.fireAuth.VerifyIDToken(ctx, t)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		_, err := fmt.Fprintf(w, "%s", err)
		if err != nil {
			log.Println(err)
		}
		return
	}

	fmt.Fprintf(w, "Hello %s, Expires %d!\n", token.UID, token.Expires)
}
