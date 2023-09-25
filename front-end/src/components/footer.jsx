const Footer = ({ theme }) => {
  return (
    <div
      className={
        theme === "dark"
          ? "d-flex flex-column text-secondary border-top border-primary bg-primary text-white"
          : "d-flex flex-column text-secondary bg-dark border-top border-primary"
      }
      data-bs-theme="dark"
    >
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-1">
        <span className="mb-3 mb-md-0 m-auto align-items-center">
          Fenestra Project Manager © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
};

export default Footer;

// className={
//         theme === "dark"
//           ? "d-flex flex-column text-secondary bg-dark border-top border-primary bg-primary"
//           : "d-flex flex-column text-secondary bg-dark border-top border-primary"
//       }
//       data-bs-theme="dark"
