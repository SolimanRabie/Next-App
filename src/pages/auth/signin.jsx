import { signIn } from "next-auth/react";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4 p-5">
            <div className="text-center mb-5">
              <h1 className="fw-bold text-primary mb-3">🔐 Sign In</h1>
              <p className="text-muted">
                Choose your preferred authentication method
              </p>
            </div>

            <div className="d-grid gap-3">
              <button
                onClick={() =>
                  signIn("github", { redirect: true, callbackUrl: "/products" })
                }
                className="btn btn-dark btn-lg rounded-pill fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
              >
                <span>🐙</span>
                Sign in with GitHub
              </button>

              <button
                onClick={() =>
                  signIn("google", { redirect: true, callbackUrl: "/products" })
                }
                className="btn btn-light btn-lg rounded-pill fw-bold py-3 d-flex align-items-center justify-content-center gap-2 border border-2"
              >
                <span>🔍</span>
                Sign in with Google
              </button>

              <button
                onClick={() =>
                  signIn("facebook", {
                    redirect: true,
                    callbackUrl: "/products",
                  })
                }
                className="btn btn-primary btn-lg rounded-pill fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
              >
                <span>👤</span>
                Sign in with Facebook
              </button>
            </div>

            <hr className="my-4" />

            <p className="text-center text-muted">
              <Link
                href="/"
                className="text-primary text-decoration-none fw-bold"
              >
                ← Back to Home
              </Link>
            </p>

            <div className="alert alert-info mt-4 small">
              <strong>Demo Credentials:</strong>
              <p className="mb-0">
                To test authentication, you'll need to set up OAuth credentials
                in your .env.local file:
              </p>
              <code className="d-block mt-2">
                GITHUB_ID=your_github_id
                <br />
                GITHUB_SECRET=your_github_secret
                <br />
                GOOGLE_ID=your_google_id
                <br />
                GOOGLE_SECRET=your_google_secret
                <br />
                FACEBOOK_ID=your_facebook_id
                <br />
                FACEBOOK_SECRET=your_facebook_secret
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
