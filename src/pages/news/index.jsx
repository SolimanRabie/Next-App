import React, { useState, useEffect } from "react";
import Toast from "./components/Toast";

const News = ({ newsData }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toastMessages = [
    "📰 Fresh news loaded!",
    "🔔 Check out the latest updates!",
    "⭐ You have new stories to read!",
    "📢 Breaking news available!",
    "🎯 Latest articles added!",
    "🚀 New content is here!",
  ];

  useEffect(() => {
    const randomMessage =
      toastMessages[Math.floor(Math.random() * toastMessages.length)];
    setToastMessage(randomMessage);
    setShowToast(true);
  }, []);

  return (
    <div className="container py-5">
      <div className="row mb-5 align-items-center">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold text-primary mb-3">
            📰 Latest News
          </h1>
          <p className="lead text-muted">
            Stay updated with the latest stories and updates from our store.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {newsData && newsData.length > 0 ? (
          newsData.map((news) => (
            <div key={news._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-lg border-0 rounded-4 transition-hover">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <span className="badge bg-primary rounded-pill px-3 py-2">
                      News
                    </span>
                  </div>
                  <h5 className="card-title fw-bold text-dark mb-3">
                    {news.title}
                  </h5>
                  <p className="card-text text-muted mb-3">
                    {news.description}
                  </p>
                  {news.content && (
                    <p className="card-text small text-secondary mb-3">
                      {news.content.substring(0, 100)}...
                    </p>
                  )}
                  <button className="btn btn-primary rounded-pill w-100 fw-bold">
                    Read More →
                  </button>
                </div>
                <div className="card-footer bg-light border-0 rounded-bottom-4 p-3">
                  <small className="text-muted">
                    {new Date(news.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="bg-light rounded-4 p-5">
              <h3 className="text-muted">😔 No news available yet</h3>
              <p className="text-muted">Check back soon for updates!</p>
            </div>
          </div>
        )}
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default News;

export async function getServerSideProps() {
  try {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.NEXT_PUBLIC_API_URL || "localhost:3000";

    const res = await fetch(`${protocol}://${host}/api/news`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        props: {
          newsData: [],
        },
      };
    }

    const newsData = await res.json();

    return {
      props: {
        newsData,
      },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: {
        newsData: [],
      },
    };
  }
}
