import PageHeader from "./common/pageHeader";
const About = () => {
  return (
    <div>
      <PageHeader title="About" description="" />
      <div className="container">
        <div
          className="card mb-3 m-auto text-center shadow p-3 mb-5 bg-body rounded"
          style={{ maxWidth: "40rem" }}
        >
          <img src="images/about1.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Fenestra Project Manager</h5>
            <p className="card-text">
              This is a closed application intended for small companies. Only
              company employees have the opportunity to enter the application
            </p>
          </div>
        </div>
      </div>
      <div className="container row m-auto" style={{ maxWidth: "55rem" }}>
        <div
          className="card mb-3 m-auto text-center shadow p-3 mb-5 bg-body rounded"
          style={{ maxWidth: "15rem" }}
        >
          <div className="card-body">
            <h5 className="card-title">Possibilities</h5>
            <p className="card-text">
              Ability to edit and delete a project Search & Sorting by specific
              data
            </p>
          </div>
        </div>
        <div
          className="card mb-3 m-auto text-center shadow p-3 mb-5 bg-body rounded"
          style={{ maxWidth: "15rem" }}
        >
          <img src="images/about3.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Possibilities</h5>
            <p className="card-text">Options to get started project</p>
          </div>
        </div>
        <div
          className="card mb-3 m-auto text-center shadow p-3 mb-5 bg-body rounded"
          style={{ maxWidth: "15rem" }}
        >
          <div className="card-body">
            <h5 className="card-title">Possibilities</h5>
            <p className="card-text">
              Additional bonus: to-do list for every day, and saved to your
              local computer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
