import "react";
import "./Home.css";

const Home: React.FC = () => {
  const curDate = new Date();
  const date = curDate.getHours();
  let greeting = "";

  const greetTimo = (date: number): string => {
    if (date > 1 && date < 12) {
      return "Guten morgen Timo";
    } else if (date >= 12 && date < 19) {
      return "Guten Nachmittag Timo";
    }
    return "Guten Abend Timo";
  };

  return (
    <div className="home-container">
      <div>
        <h1>{greetTimo(date)}</h1>
      </div>
    </div>
  );
};

export default Home;
