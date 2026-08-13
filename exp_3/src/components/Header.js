import "./Header.css";

function Header({ month, year, prevMonth, nextMonth }) {

    return (

        <div className="header">

            <div>
                <h1>Social Media Scheduler</h1>
                <p>
                    Schedule and manage your posts easily
                </p>
            </div>
            <div className="navigation">

                <button onClick={prevMonth}>
                    Previous
                </button>

                <div className="month">

                    {month} {year}

                </div>

                <button onClick={nextMonth}>
                    Next
                </button>

            </div>

        </div>

    );

}

export default Header;