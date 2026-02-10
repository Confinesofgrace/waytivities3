import { useAuth } from "../../Components/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // prevents flash before redirect
  const purchasedBooks = JSON.parse(sessionStorage.getItem("purchasedBooks") || "[]");


  return (
    <div
      style={{
        backgroundColor: "rgba(235, 248, 178, 0.233)",
        minHeight: "100vh",
      }}
    >
      <div id="page-layout">
        <div className="profile-card">
          <h2>My Profile</h2>

          <div className="profile-info">
            <div className="avatar">
              {user.photoURL ? (
                <img src={user.photoURL} alt="profile" />
              ) : (
                <span>{user.email[0].toUpperCase()}</span>
              )}
            </div>

            <div>
              <p><strong>Name:</strong> {user.displayName || "Not set"}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>

          <h3>My Library</h3>

            {purchasedBooks.length === 0 ? (
                <p>You haven't purchased any books yet.</p>
                ) : (
                <div className="library-grid">
                    {purchasedBooks.map((book) => (
                    <div key={book.id} className="library-book">
                        <img src={book.frontCover} alt={book.title} />
                        <p>{book.title}</p>
                    </div>
                    ))}
                </div>
            )}


          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
