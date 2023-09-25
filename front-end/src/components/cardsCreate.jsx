import PageHeader from "./common/pageHeader";
import NewProject from "./newProject";
import OrderDrawing from "./orderDrawing";
import IsCompleteProject from "./isCompleteProject";
import UpNewRevision from "./upNewRevision";
import useCardsCreate from "../hooks/useCardsCreate";
const CardsCreate = () => {
  const {
    checkComplete,
    cardName,
    form,
    pNames,
    rev,
    isEmpty,
    user,
    select,
    handleStopClick,
    handleSelectChange,
    handlePrNameFromRevisinChange,
    handleRevisinChange,
    handleIsEmptyChange,
    updateRevosioin,
  } = useCardsCreate();
  return (
    <div className="container-fluid">
      {!checkComplete ? (
        <IsCompleteProject
          handleStopClick={handleStopClick}
          cardName={cardName}
        />
      ) : (
        <div>
          <PageHeader title={"Welcome to Project Manager"} />
          <div className="text-center">
            <select className="p-1 mt-3 mb-3" onChange={handleSelectChange}>
              <option>Choose actions:</option>
              <option>New Project</option>
              <option>Up new revision</option>
              <option>Order drawing</option>
            </select>
          </div>
          {select <= 0 || select === "Choose actions:" ? (
            <div className="text-center mt-5">
              <img
                className="img-fluid "
                src="/images/d1.png"
                alt=""
                style={{
                  maxHeight: "25rem",
                }}
              />
              <p className="text-center mt-5 fs-5">
                Choose something to start...
              </p>
            </div>
          ) : null}
          {select === "New Project" && (
            <NewProject
              form={form}
              handleIsEmptyChange={handleIsEmptyChange}
              pNames={pNames}
              user={user}
              select={select}
              rev={rev}
              isEmpty={isEmpty}
            />
          )}
          {select === "Up new revision" && (
            <UpNewRevision
              form={form}
              handleIsEmptyChange={handleIsEmptyChange}
              pNames={pNames}
              user={user}
              select={select}
              rev={rev}
              isEmpty={isEmpty}
              handlePrNameFromRevisinChange={handlePrNameFromRevisinChange}
              handleRevisinChange={handleRevisinChange}
              updateRevosioin={updateRevosioin}
            />
          )}
          {select === "Order drawing" && (
            <OrderDrawing
              form={form}
              handleIsEmptyChange={handleIsEmptyChange}
              pNames={pNames}
              user={user}
              select={select}
              rev={rev}
              isEmpty={isEmpty}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CardsCreate;
