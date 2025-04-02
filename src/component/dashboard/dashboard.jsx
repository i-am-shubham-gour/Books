import "./dashboard.scss";
import Fiction from "../../assets/icons/Fiction.svg";
import Philosophy from "../../assets/icons/Philosophy.svg";
import Drama from "../../assets/icons/Drama.svg";
import History from "../../assets/icons/History.svg";
import Humour from "../../assets/icons/Humour.svg";
import Adventure from "../../assets/icons/Adventure.svg";
import Politics from "../../assets/icons/Politics.svg";
import Next from "../../assets/icons/Next.svg";

const category = [
  { id: 1, name: "FICTION", icon: Fiction },
  { id: 2, name: "PHILOSOPHY", icon: Philosophy },
  { id: 3, name: "DRAMA", icon: Drama },
  { id: 4, name: "HISTORY", icon: History },
  { id: 5, name: "HUMOUR", icon: Humour },
  { id: 6, name: "ADVENTURE", icon: Adventure },
  { id: 7, name: "POLITICS", icon: Politics },
];

export const Dashboard = () => {
  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
          <div className="title">Gutenberg Project</div>
          <div className="desc">
            A social cataloging website that allows you to freely search its
            database of books, annotations, and reviews.
          </div>
        </div>
      </div>
      <div className="content">
        <div className="category">
          {category.map((item) => (
            <div className="category-item" key={item.id}>
              <div className="category-left-content">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="category-icon"
                />
                <div className="category-name">{item.name}</div>
              </div>
              <div className="category-right-content">
                <img src={Next} alt="next icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
