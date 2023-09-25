const PageHeader = ({ title, description }) => {
  return (
    <div className="container text-center">
      <div className="row mt-4">
        <div className="col-12 ">
          <h2>{title}</h2>
        </div>
      </div>
      {description && (
        <div className="row mt-2">
          <div className="col-12">
            <h5>{description}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
